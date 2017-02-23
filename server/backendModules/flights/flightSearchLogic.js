'use strict';
import bfm from "../sabre_objects/rest/bfm";
import flightSearchUtils from "./utils/flightSearchUtils";
import restProxy from '../utils/restproxy';
import sabreFlightAPi from '../utils/sabreFlightApi';

export default class FlightSearchLogic {
  create(data) {
    return new Promise((accept, reject) => {
      let callBackFunction = function(error, result, response) {
        if (error) {
          console.log(`callback error function ${error}`);
          console.log(JSON.stringify(response.body));
          return reject(error);
        } else {
          console.log(result);
          let flightSearchResult = flightSearchUtils.processFlightSearchResult(JSON.parse(result), data);
          if (flightSearchResult.hasError) {
            return reject(flightSearchResult.content);
          }
          return accept(flightSearchResult.content);
        }
      };
      let endpoint = '/v3.0.0/shop/altdates/flights';
      let options = {
        'mode': 'live',
        'Content-Type': 'application/json'
      };
      let payLoad = JSON.stringify(bfm(data));
      console.log(payLoad);

      return sabreFlightAPi.post(endpoint, payLoad, options, callBackFunction);

    // console.log(JSON.stringify(data));
    // return new Promise((accept, reject) => {
    //   let endpoint = '/v3.0.0/shop/altdates/flights';
    //   let options = {
    //     'mode': 'live',
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${data.flightBooking.tokenId}`
    //   };
    //   let payLoad = JSON.stringify(bfm(data));
    //   let ctx = {};
    //   ctx.url = endpoint;
    //   ctx.headers = options;
    //   ctx.body = payLoad;
    //   restProxy(ctx)
    //     .then((result) => {
    //       let flightSearchResult = flightSearchUtils.processFlightSearchResult(result, data);
    //       if (flightSearchResult.hasError) {
    //         return reject(flightSearchResult.content);
    //       }
    //       return accept(flightSearchResult.content);
    //     })
    //     .catch(error => {
    //       console.log(`callback error function ${error}`);
    //       return reject(error);
    //     });
    });
  }

  get(id, params) {
    return new Promise((resolve, reject) => {

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
