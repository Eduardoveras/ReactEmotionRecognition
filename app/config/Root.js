import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import Reports from '../components/Reports';
import Login from '../components/Login';
import VideoReport from '../components/VideoReport';
import Manuales from '../components/Manuales';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={App} exact />
        <Route path="/" component={Login} exact />
        <Route path="/reports" component={Reports} exact />
        <Route path="/reports/:id" component={VideoReport} exact />
        <Route path="/manuales" component={Manuales} exact />
      </Switch>
    </Router>
  );
};

export default Root;

