import React from 'react'
import {SimpleSelect} from 'react-selectize'
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

  _getUser(e) {
    actions.github.users.get({user: e.value})
     .then(() => {
        let user = store.github.users.get();
        let price = ((Number(user.followers) * 2) + (Number(user.public_repos) * 1)) / 2;
        
        this.setState({price: price});
      });
  }

  render() {

    let {price} = this.state;
    let users = store.github.organizations.getMembers();

    return (
      <div className="row">
        <h2>Add a developer</h2>
        <form className="form-inline" role="form">
          <div className="form-group">
            <SimpleSelect className="text"
                          placeholder="GitHub Username"
                          theme="bootstrap3"
                          onValueChange={this._getUser.bind(this)}>
              {
                users &&
                  users.map(({login}, index) =>
                    <option key={index}
                            value={login}>{login}</option>
                  )
              }
            </SimpleSelect>
          </div>
          <div className="form-group">
            <input className="form-control"
                   type="text"
                   placeholder="Price"
                   value={price} />
          </div>
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      </div>
    );
  }
}
