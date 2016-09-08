import React from 'react';
import {Link, navigate} from 'react-page';

export default class Checkout extends React.Component {

  _click(e) {
  	e.preventDefault();
    console.log('clicked!');
  }

  render() {

    return (
      <div id="Checkout">
    <div className="container">
      <div className="row">
        <h1>Dev Shop</h1>
      </div>

      <div className="row">
        <h2>Add a developer</h2>
        <form className="form-inline" role="form">
          <div className="form-group">
            <input type="text" placeholder="GitHub Username" className="form-control" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Price" className="form-control" />
          </div>
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      </div>

      <div className="cart row">
        <h2>Cart</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="product">
              <td>brenoc</td>
              <td>$224</td>
              <td><button className="btn btn-danger pull-right">Remove</button></td>
            </tr>
            <tr className="product">
              <td>firstdoit</td>
              <td>$416</td>
              <td><button className="btn btn-danger pull-right">Remove</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="totalizer row">
        <div className="col-sm-5">
          <div className="row">
            <table className="table">
              <tbody>
                <tr className="total">
                  <td>Total</td>
                  <td>$640</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
      </div>
    );
  }
}
