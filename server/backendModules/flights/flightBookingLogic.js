'use strict';
import flightBookingUtil from "./utils/flightBookingUtils";
import flightBooking from "../sabre_objects/rest/flightBooking";
import restProxy from "../utils/restproxy";

export default class FlightLogic {
    create(data, params) {
        console.log('in here');
        return new Promise((resolve, reject) => {
            let endpoint = '/v1.0.0/passenger/records';
            let options = {
                'mode': 'live',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.tokenId}`
            };
            let payLoad = JSON.stringify(flightBooking(data));
            let ctx={};
            ctx.url=endpoint;
            ctx.headers=options;
            ctx.body=payLoad;
            restProxy(ctx)
                .then((result)=>{
                    let flightBookingResult = flightBookingUtil.processFlightBooking(result, data);
                    if (flightBookingResult.hasError) {
                        return resolve(flightBookingResult.content); //TODO:reject(flightBookingResult.content);
                    }
                    return resolve(flightBookingResult.content);
                })
                .catch((error)=>{
                    console.log(`callback error function ${error}`);
                    return reject(error);
                });
        });
    }

    get(id, params) {
        return new Promise((resolve, reject) => {
            return resolve({id: 'newID', payLoad: 'payLoad'});
        });
    }

    find(params) {
        return new Promise((resolve, reject) => {

        });
    }

    update(id, data, params) {
        return new Promise((resolve, reject) => {

        });
    }

    patch(id, data, params) {
        return new Promise((resolve, reject) => {

        });
    }

    remove(id, params) {
        return new Promise((resolve, reject) => {

        });
    }
}

