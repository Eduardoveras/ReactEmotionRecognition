/* eslint-disable import/extensions,import/no-unresolved, no-multi-assign */
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Root from './config/Root';
import ButtonAppBar from './components/fragments/appBar'

window.$ = window.jQuery = require('jquery');


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <div>
        <CssBaseline />
        <ButtonAppBar />
        <div className="container-fluid main">
          <div className="row border border-primary rounded main-box">
            <Component />
          </div>
        </div>
      </div>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
