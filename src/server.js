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
import path from 'path';

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
  let bundles = getBundles(stats, modules);
  template = template.replace('</head>', `
    ${bundles.map(bundle => {
      if (bundle.publicPath.slice(bundle.publicPath.length - 3) === 'css') {
        return `<link href="${bundle.publicPath}" rel="stylesheet">`
      }
      return `<script src="${bundle.publicPath}"></script>`
    }).join('\n')}
    <script id="script-state">window.__STATE__ = ${JSON.stringify(preloadState)}</script>
  </head>`);
  template = template.replace('<div id="root">', `<div id="root">${frontComponet}`);
  replay.res.write(template)
  replay.res.end()
}