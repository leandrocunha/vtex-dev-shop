import React from 'react'
import Numeral from 'numeral'
import {Link} from 'react-page'

export default class Total extends React.Component {

  render() {

    const {discounts, subtotal, total} = this.props;

    return(
      <div className="totalizer row">
        <div className="col-sm-5 col-sm-offset-7">
          <div className="row">
            <table className="table">
              <tbody>
                <tr className="discounts">
                  <td>Discounts</td>
                  <td>{discounts}</td>
                </tr>
                <tr className="subtotal">
                  <td>Subtotal</td>
                  <td>{Numeral(subtotal).format('$ 0,0.00')}</td>
                </tr>
                <tr className="total">
                  <td><strong>Total</strong></td>
                  <td><strong>{total ? Numeral(total).format('$ 0,0.00') : Numeral(subtotal).format('$ 0,0.00')}</strong></td>
                </tr>
              </tbody>
            </table>
            <Link className="btn btn-lg btn-success"
                  to="order">checkout</Link>
          </div>
        </div>
      </div>
    );
  }
}
