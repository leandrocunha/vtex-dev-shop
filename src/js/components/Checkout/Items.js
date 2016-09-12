import React from 'react'
import {map} from 'lodash'  
import Numeral from 'numeral'

export default class Items extends React.Component {

  render() {

    const {products} = this.props;

    return(
      <tbody>
        {
          map(products, ({price, hours, user}, index) =>
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
    );
  }
}
