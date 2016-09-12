import React, {findDOMNode} from 'react'
import {map} from 'lodash'
import Numeral from 'numeral'
import {actions, store} from './../../flux'
import Empty from './Empty'
import Total from './Total'

export default class Cart extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      items: []
    };
  }

  componentDidMount() {
    store.vtex.cart.on('cartUpdated', () => {
      const items = store.vtex.cart.getCart();
      const prices = items && map(items, ({price, hours}, index) => price * hours);

      this.setState({
        items: items,
        subtotal: prices.reduce((a, b) => a + b, 0)
      });
    });
  }

  _removeItem(e) {
    actions.vtex.cart.removeItem(e.target.dataset.user);
  }

  _applyCoupon(e) {
    e.preventDefault();

    const {subtotal} = this.state;
    const coupon = findDOMNode(this.refs.couponcode);

    coupon.value === 'shipit' && this.setState({
      discounts: '30%',
      total: subtotal - (subtotal * .30)
    });
  }

  render() {

    const {items, discounts, subtotal, total} = this.state;

    return (
        <div>
          <div className="cart row">
            <h2>Cart</h2>
            <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Price</th>
                <th>Hours</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                map(items, ({price, hours, user}, index) =>
                  <tr className="product"
                      key={index}>
                    <td>
                      <img className="avatar" src={user.avatar_url} />
                      <span className="info">
                        <span className="name">{user.name}</span>
                        <span className="username">{`${user.login} - ${user.company}`}</span>
                        <span className="email">{`${user.email}`}</span>
                      </span>
                    </td>
                    <td>{Numeral(price).format('$ 0,0.00')}</td>
                    <td>{`x${hours}`}</td>
                    <td>{Numeral(price*Number(hours)).format('$ 0,0.00')}</td>
                    <td><button className="btn btn-danger pull-right"
                                data-user={user.login}
                                onClick={this._removeItem.bind(this)}>Remove</button></td>
                  </tr>
                )
              }
              { items.length === 0  && <Empty /> }
              <tr className="coupon">
                <td colSpan="5">
                  <form className="form-inline"
                        onSubmit={this._applyCoupon.bind(this)}
                        role="form">
                    <div className="form-group">
                      <input className="form-control"
                             type="text"
                             placeholder="Have a discount coupon?"
                             ref="couponcode" />
                    </div>
                    <button type="submit" className="btn btn-success">Apply coupon</button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Total {...this.state} />
      </div>
    );
  }
}
