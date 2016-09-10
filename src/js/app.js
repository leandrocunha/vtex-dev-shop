LazyLoad.css([`${vTex.baseURL}node_modules/selectize/dist/css/selectize.css`]);

LazyLoad.js([`${vTex.baseURL}assets/js/vendors.js`], () => {

  const _ = require('lodash');

  global.React = require('react');
  _.assign(global.React, require('react-dom'));
  
  global.jQuery = require('jquery');
  global.$ = jQuery;

  LazyLoad.js([`${vTex.baseURL}node_modules/selectize/dist/js/standalone/selectize.js`],
    () => require('./router'));
});
