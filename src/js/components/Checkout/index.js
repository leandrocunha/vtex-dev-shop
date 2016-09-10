import React from 'react'
import {Link, navigate} from 'react-page'
import {actions, store} from './../../flux'
import Search from './Search'
import Cart from './Cart'

export default class Checkout extends React.Component {

  render() {

    return (
      <div id="Checkout">
        <div className="container">
          <div className="row">
            <h1>Dev Shop</h1>
          </div>
          <Search />
          <Cart />
        </div>
      </div>
    );
  }
}
