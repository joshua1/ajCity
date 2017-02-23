import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authentication from './modules/authentication';
import flight from './modules/flight';
import Storage from 'store2';


window.ajalaStore=Storage;
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    authentication,
      flight
  },
    plugins:[createPersistedState({
        getState: (key) => window.ajalaStore.get(key),
        setState: (key, state) => window.ajalaStore.set(key, state)
    })],
  strict: process.env.NODE_ENV !== 'production'
});
