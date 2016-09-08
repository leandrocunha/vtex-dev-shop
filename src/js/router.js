import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'react-page';

import Checkout from './components/Checkout';
import Main from './components/Main';

var render = RootComponent => ReactDOM.render(<RootComponent />,
  document.getElementById('app'));

Page.set(render)
 .with(Main)
  .on(
    'app',
    '/',
    Checkout
  )
  .run();
