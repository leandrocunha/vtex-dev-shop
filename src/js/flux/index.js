import McFly from 'mcfly';

const Flux = new McFly();

// SET ACTIONS
const githubOrganizationsActions = Flux.createActions(
  {
    members: (params) => new Promise(function(resolve, reject) {
      $.get(`https://api.github.com/orgs/${params.org}/members`)
        .done((data) => resolve(data))
        .fail((jqxhr, textStatus, error) => console.log(error));
      })
      .then((result) => ({
        data: result,
        actionType: "GITHUBORGANIZATIONMEMBERS"
    }))
  }
);

const githubUsersActions = Flux.createActions(
  {
    get: (params) => new Promise(function(resolve, reject) {
      $.get(`https://api.github.com/users/${params.user}`)
        .done((data) => resolve(data))
        .fail((jqxhr, textStatus, error) => console.log(error));
      })
      .then((result) => ({
        data: result,
        actionType: "GITHUBUSERGET"
    }))
  }
);


// SET STORES
const githubOrganizationsStore = Flux.createStore(
  {
    setMembers: function(data) {
      this.members = data;
    },

    getMembers: function() {
      return this.members;
    }
  },

  function(payload){
    switch(payload.actionType) {
      case 'GITHUBORGANIZATIONMEMBERS':
        githubOrganizationsStore.setMembers(payload.data);
        break;

      default:
        return false;
    }

    return true;
  }
);

const githubUsersStore = Flux.createStore(
  {
    set: function(data) {
      this.user = data;
    },

    get: function() {
      return this.user;
    }
  },

  function(payload){
    switch(payload.actionType) {
      case 'GITHUBUSERGET':
        githubUsersStore.set(payload.data);
        break;

      default:
        return false;
    }

    return true;
  }
);

// HELPER
const aliases = {
  actions: {
    github: {
      organizations: githubOrganizationsActions,
      users: githubUsersActions
    }
  },

  store: {
    github:{
      organizations: githubOrganizationsStore,
      users: githubUsersStore
    }
  }
}

module.exports = aliases;

vTex.flux = aliases;
