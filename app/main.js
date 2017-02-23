
import Vue from 'vue';
import App from './app.vue';

// Configure Vue router and Vuex store
import router from './router';
import  store from './store';
import Storage from 'store2';
import {sync} from 'vuex-router-sync';
import swal from 'sweetalert2';
import Sugar from 'sugar';
import {helperPlugin, flatpickrPlugin, selectPlugin, servicePlugin, ajalaStorePlugin,localStorageList} from './utils/plugins';
import services from './services/index';


window.Sugar = Sugar;
window.Sugar.extend();
window.swal = swal;
window.ajalaStore = Storage;
Date.setLocale('en-GB');
Vue.use(helperPlugin);
Vue.use(flatpickrPlugin);
Vue.use(selectPlugin);
Vue.use(servicePlugin);
Vue.use(ajalaStorePlugin, window.ajalaStore, localStorageList)
sync(store, router);


export default new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
