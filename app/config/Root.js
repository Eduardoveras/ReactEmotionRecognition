import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import Reports from '../components/Reports';
import Login from '../components/Login';
import VideoReport from '../components/VideoReport';
import Manuales from '../components/Manuales';
import Cases from '../components/Cases';
import Case from '../components/Case';
import Settings from '../components/Settings';
import Analysis from '../components/Analysis';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={App} exact />
        <Route path="/" component={Login} exact />
        <Route path="/reports" component={Reports} exact />
        <Route path="/reports/:id" component={VideoReport} exact />
        <Route path="/manuales" component={Manuales} exact />
        <Route path="/casos" component={Cases} exact />
        <Route path="/casos/:id" component={Case} exact />
        <Route path="/ajustes" component={Settings} exact />
        <Route path="/analisis/:id" component={Analysis} exact />
      </Switch>
    </Router>
  );
};

export default Root;

