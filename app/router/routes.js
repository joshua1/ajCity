import * as guards from './guards';

export default [
    {
        path: '/',
        name: 'index',
        component: require('../views/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: require('../views/login.vue'),
        beforeEnter: guards.restrictToUnauthenticated
    },
    {
        path: '/logout',
        name: 'logout',
        component: require('../components/logout.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: require('../views/register.vue')
    },
    {
        path:'/flightresult',
        name:'flightResult',
        component:require('../views/flight/flightResult.vue')
    },
    {
        path: '/flightbooking',
        name: 'flightBooking',
        component: require('../views/flight/flightBooking.vue'),
        //beforeEnter: guards.restrictToAuthenticated
    },
    {
        path:'/flightInvoice',
        name:'flightInvoice',
        component:require('../views/flight/flightInvoice.vue')
    },
    {
        path: '*',
        name: 'not-found',
        component: require('../views/not-found.vue')
    }
];
