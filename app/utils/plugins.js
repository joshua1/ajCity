'use strict';
import services from '../services/index';
const VueMultiselect = require('vue-multiselect').default;
import VueFlatpickr from '../components/vue-flatpickr.vue';
import helpers from './helpers';

const servicePlugin = {
  install(Vue, options) {
    "use strict";
    Vue.prototype.$flightService = services.flightService;
  //others to come in here
  }
}

const flatpickrPlugin = {
  install(Vue) {
    Vue.component('FlatPickr', VueFlatpickr);
  }
};
const helperPlugin = {
  install(Vue) {
    Vue.prototype.$helpers = helpers;
  }
};
const selectPlugin = {
  install(Vue, options) {
    Vue.component('Multiselect', VueMultiselect);
  }
};
const ajalaStorePlugin = {
  install(Vue, store, scheme) {

    // Init the layer
    // store.getAll() returns all localStorage serialized
    // filter() returns store.getAll() without items that may occasionally be out of the Scheme
    const _localStorage = ((() => {

      const filtered = {};

      for (let key in store.getAll()) {
        if (scheme.includes(key)) {
          filtered[key] = store.getAll()[key];
        }
      }

      // console.log(filtered);
      return filtered;

    }))();

    (function verify_scheme() {
      if (!scheme || !Array.isArray(scheme)) {
        console.error("Schemes are not defined or are not an Array.");
        return false;
      }


      scheme.forEach(val => {
        if (!_localStorage[val]) {
          _localStorage[val] = null;
          store.set(val, null);
        }
      });
    })();
    Vue.mixin({
      data() {
        return {
          localStorage: _localStorage
        };
      },
      watch: ((() => {
        const watchers = ((() => {

          const _w = {};

          scheme.forEach(item => {
            _w[item] = val => {
              store.set(item, val);
              console.log(`${ item } watcher executed...`);
            };
          });

          return _w;

        }))();
        const name_space_parsed = ((() => {

          const _w = {};

          for (let key in watchers) {
            _w[`localStorage.${key}`] = watchers[key];
          }

          return _w;

        }))();

        return name_space_parsed;

      }))(),
      beforeMount() {
        this.localStorage.remove = key => {

          if (scheme.includes(key)) {
            _localStorage[key] = null;
            store.set(key, null);
          } else {
            console.error("reactiveStorage cannot remove an item which is out of the Scheme");
          }

        };
        this.localStorage.clear = () => {

          scheme.forEach(item => {
            _localStorage[item] = null;
            store.set(item, null);
          });

        };

      }
    });
  }
};
const localStorageList = [
  'airportList',
  'bankAccount',
  'sessionId',
  'tokenId',
  'initialDataSet',
  'startLocation',
  'endDestination',
  'loadingModal',
  'flightSearchResult',
  'departDate',
  'flightSearchParams',
  'currentFlightSelection',
];

export { servicePlugin, helperPlugin, ajalaStorePlugin, flatpickrPlugin, selectPlugin, localStorageList };
