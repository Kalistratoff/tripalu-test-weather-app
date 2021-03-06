import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// route components
import App from './ui/App';
import MyCities from './ui/MyCities';
import CitySearch from './ui/CitySearch';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/search" component={CitySearch}/>
    </div>
  </Router>
);