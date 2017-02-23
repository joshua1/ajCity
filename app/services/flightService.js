'use strict';
import feathersClient from '../feathersClient';
const flightService = {
    preloadData: (localStorage) => {
        const airportList = localStorage.airportList || [];
        const sessionId = localStorage.sessionId;
        const tokenId = localStorage.tokenId;
        console.log(`airport list count is ${airportList ? airportList.length : 0}`);
        const listService = feathersClient.service('api/airportList');
        const sessionService = feathersClient.service('api/sessionService');
        const tokenService = feathersClient.service('api/tokenService');

        if (!(airportList && airportList.length > 0)) {


            listService.on('connection', () => {
                console.log('service connected');
            });
            listService.find().then((resultList) => {
                /*eslint no-undef:0*/
                resultList.map((result) => {
                    airportList.push({id: result.id, text: result.text});
                })
                localStorage.airportList = airportList;
            })
                .catch((listError) => {
                    console.log(`airportList error ${listError}`);
                });

        }
        else if (!sessionId) {
            console.log('getting SessionId');
            sessionService.find().then((sessionResult) => {
                console.log(JSON.stringify(sessionResult));
                localStorage.sessionId =sessionResult;
            }).catch((sessionError) => {
                console.log(`Session error ${sessionError}`);
            });
        }
        else if (!tokenId) {
            console.log('Get token')
            tokenService.find().then((tokenResult) => {
                console.log(JSON.stringify(tokenResult.tokenId));
                localStorage.tokenId = tokenResult.tokenId;
            }).catch((tokenError) => console.log(`token get error ${tokenError}`));
        }
        else {
            console.log('all data in play');
        }
    },
    searchFlights: (params) => {
        return new Promise((resolve, reject) => {
            const flightService = feathersClient.service('api/flight/search');
            flightService.create(params).then((result) => {
                resolve(result);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    },
    bookAndRegister: (params) => {
        return new Promise((resolve, reject) => {
            console.log('book and reg');
            const flightBookingService = feathersClient.service('api/flight/bookings');
            flightBookingService.create(params).then((result) => {
                return resolve(result);
            }).catch((error) => {
                console.log('error from backend');
                return resolve(error); //TODO: reject(error)
            });
        });
    },

    createFlightPayment: (params) => {
        return new Promise((resolve, reject) => {
            const flightPaymentService = feathersClient.service('api/flight/payments');
            flightPaymentService.create(params).then((result) => {
                return resolve(result);
            }).error(error => {
                return reject(error);
            });
        });
    },

    updateFlightBooking: (paymentObject) => {
        return new Promise((resolve, reject) => {
            const flightBookingService = feathersClient.service('api/flight/bookings');
            flightBookingService.patch(paymentObject.id, paymentObject).then((result) => {
                return resolve(result);
            }).error(error => {
                return reject(error);
            });
        });
    }
};
export default flightService;