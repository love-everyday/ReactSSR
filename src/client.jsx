import React from 'react'
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import configureStore from './redux/configureStore';
import App from './components/app';

const state = window.__STATE__;

const scriptState = document.getElementById('script-state');
scriptState && scriptState.parentNode.removeChild(scriptState);

const store = configureStore(state);
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
)
if (module.hot) {
  module.hot.accept()
}

