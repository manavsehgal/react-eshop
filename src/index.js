import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './ReactEshop.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MissingRoute from './MissingRoute.js';
import ProductDetail from './ProductDetail.js';
import Landing from './Landing.js';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

const routes =
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="/detail/:slug" component={ProductDetail} />
  </Route>
  <Route path="*" component={App}>
    <IndexRoute component={MissingRoute} />
  </Route>
</Router>;

ReactDOM.render(
  routes,
  document.getElementById('root')
);
