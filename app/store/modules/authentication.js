import feathersClient from '../../feathersClient';

const state = {
  token: null,
  user: {}
};

const getters = {
  isAuthenticated (state) {
    return state.token !== null;
  }
};

const mutations = {
  LOGIN (state, result) {
    state.token = result.token;
    state.user = result.data;
  },
  LOGOUT (state) {
    state.token = null;
    state.user = {};
  }
};

const actions = {
  // Verify authentication with token from local storage
  authenticate: ({commit}) => {
    return feathersClient.authenticate()
      .then(result => commit('LOGIN', result));
  },
  // Login user with email / password
  login: ({commit}, payload) => {
    return feathersClient.authenticate({type: 'local', ...payload})
      .then(result => commit('LOGIN', result));
  },
  // Logout user
  logout: ({commit}) => {
    return feathersClient.logout()
      .then(result => commit('LOGOUT'));
  },
  // Register and login new user
  register: ({dispatch, commit}, payload) => {
    return feathersClient.service('users').create({...payload})
      .then(result => dispatch('login', {...payload}));
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
