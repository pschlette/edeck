// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import './index.scss';

const deckId: string = window.location.pathname.split('/').pop();

ReactDOM.render(
  React.createElement(App, { deckId }),
  document.getElementById('root'),
);
