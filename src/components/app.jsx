import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from "react-loadable";
require('../require-ensure-shim.js').shim(require);
// import Home from './home'
// import Detail from './detail'
/*
const loadable = (path) => Loadable({
  loader: () => import(`./${path}`),
  loading: () => <div></div>
})
const Home = loadable('home')
const Detail = loadable('detail');
//*/
//*
const Home = Loadable({
  loader: () => import('./home'),
  loading: () => <div></div>
})
const Detail = Loadable({
  loader: () => import('./detail'),
  loading: () => <div></div>
})
export default () => {
  return(
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
    </Switch>
  );
}