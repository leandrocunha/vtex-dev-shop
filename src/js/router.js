import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'react-page';

import Checkout from './components/Checkout';
import Main from './components/Main';
import Order from './components/Order';

var render = RootComponent => ReactDOM.render(<RootComponent />,
  document.getElementById('app'));

Page.base(vTex.baseURL || '/');

Page.set(render)
 .with(Main)
  .on(
    'app',
    '/',
    Checkout
  )
  .on(
    'order',
    '/order',
    Order
  )
  .run();
