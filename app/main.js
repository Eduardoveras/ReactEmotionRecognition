/* eslint-disable import/extensions,import/no-unresolved */
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Menu from './components/fragments/Menu';
import Root from './config/Root';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <div>
        <Menu />
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
