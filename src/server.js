import React from 'react';
import {renderToNodeStream, renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import fetch from 'node-fetch';
import 'css-modules-require-hook/preset';
import { StaticRouter } from "react-router-dom";
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'

import configureStore from './redux/configureStore.js'
import App from './components/app'

import Service from './services';

import fs from 'fs';
import { promisify } from "util";

exports.serverRenderDev = async (request, replay, restfulApi) => {
  const time = new Date().getTime();
  let template = await fetch('http://127.0.0.1:3000/public/index.html').then(res => res.text());
  render(request, replay, restfulApi, template);
  const offTime = new Date().getTime() - time;
  console.log(`latency dev time : ${offTime}`);
}

exports.serverRender = async (request, replay, restfulApi) => {
  const time = new Date().getTime();
  let template = await promisify(fs.readFile)('./dist/index.html', 'utf-8');
  render(request, replay, restfulApi, template);
  const offTime = new Date().getTime() - time;
  console.log(`latency prod time : ${offTime}`);
}

const render = async (request, replay, restfulApi, template) => {
  
  const initialState = await Service(request, restfulApi);
  if (!initialState) {
    replay.send('Not Found');
    return;
  }
  const store = configureStore(initialState);
  const preloadState = store.getState();
  
  
  let modules = [];
  const context = {};
  const frontComponet = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={request.req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  const stats = require('../dist/react-loadable.json');
  const bundles = getBundles(stats, modules);
  const resources = bundles.map(bundle => {
    if (bundle.publicPath.slice(bundle.publicPath.length - 3) === 'css') {
      return `<link href="${bundle.publicPath}" rel="stylesheet" type="text/css">`
    }
    return `<script defer type="text/javascript" src="${bundle.publicPath}"></script>`
  });
  
  template = template.replace('</head>', `
    ${resources.map(item => {
      if (item.indexOf('<link') === 0) {
        return item
      }
    }).join('\n')}
  </head>`);
  template = template.replace('<div id="root"></div>', `
    <div id="root">${frontComponet}</div>
    <script type="text/javascript" id="script-state">window.__STATE__ = ${JSON.stringify(preloadState)}</script>
  `);
  template = template.replace('</body>', `
    ${resources.map(item => {
      if (item.indexOf('<script') === 0) {
        return item
      }
    }).join('\n')}
  </body>`);
  replay.res.writeHead(200, {'Content-Type': 'text/html'});
  replay.res.write(template)
  replay.res.end()
}