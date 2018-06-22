import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import Statistics from '../components/Statistics';
import Reports from '../components/Reports';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/reports" component={Reports} exact />
        <Route path="/statistics" component={Statistics} exact />
      </Switch>
    </Router>
  );
};

export default Root;

