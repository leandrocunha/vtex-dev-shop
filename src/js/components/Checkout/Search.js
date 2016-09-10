import React, {findDOMNode} from 'react'
import Numeral from 'numeral'
import {assign} from 'lodash'
import Selectize from './../Selectize'
import {actions, store} from './../../flux'

export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      price: undefined
    };
  }

  componentDidMount() {
    actions.github.organizations.members({org: 'vtex'})
     .then(() => this.setState({loading: false}));
  }

  _search(e) {
    const value = e.target.value;
    
    if(value.length > 2){
      console.log(value);
    }
  }

  _getUser(username) {
    actions.github.users.get({user: username})
     .then(() => {
        let user = store.github.users.get();
        let price = ((Number(user.followers) * 2) + (Number(user.public_repos) * 1)) / 2;

        this.setState({
            price: price,
            user: user
          });

        findDOMNode(this.refs.price).value = Numeral(price).format('$ 0,0.00');
      });
  }

  _submit(e) {
    e.preventDefault();

    let hours = findDOMNode(this.refs.hours);

    actions.vtex.cart.addItem(assign(this.state, {hours: hours.value}));
  }

  render() {

    let {price} = this.state;
    let users = store.github.organizations.getMembers();

    return (
      <div className="row">
        <h2>Add a developer</h2>
        <form className="form-inline" role="form"
              onSubmit={this._submit.bind(this)}>
          {
            <div className="form-group">
              <Selectize className="demo-default"
                         items={users.map((user, i) => user)}
                         placeholder="GitHub Username"
                         onChange={this._getUser.bind(this)}>
                {
                  users.map(({avatar_url, login}, index) =>
                    <option key={index}
                            data-avatar={avatar_url}
                            value={login}>
                      {login}
                    </option>
                  )
                }
              </Selectize>
            </div>
          }
          <div className="form-group">
            <input className="form-control"
                   disabled="disabled"
                   type="text"
                   placeholder="Price"
                   ref="price" />
          </div>
          <div className="form-group">
            <input className="form-control"
                   type="number"
                   placeholder="Hours"
                   ref="hours"
                   defaultValue="1" />
          </div>
          <button type="submit" className="btn btn-success">Add to cart</button>
        </form>
      </div>
    );
  }
}
