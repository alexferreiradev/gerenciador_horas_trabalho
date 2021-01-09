import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashBoard from './pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={DashBoard} />
      <Route path="/home" component={DashBoard} />
    </Switch>
  );
}
