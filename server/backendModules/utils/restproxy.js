'use strict';
import request from "request-promise";

module.exports = function(ctx) {
  return new Promise((resolve, reject) => {
    request.post({
      environment: process.env.SABRE_REST_URI,
      url: `${process.env.SABRE_REST_URI}${ctx.url}`,
      headers: ctx.headers,
      body: ctx.body,
      accept: 'application/json',
      rejectUnauthorized: false,
    })
      .then((resp) => {
        console.log('response received');
        console.log(JSON.stringify(resp));
        const serviceResponse = JSON.parse(resp);
        console.log(JSON.stringify(serviceResponse.root));
        resolve(serviceResponse);
      })
      .catch((err) => {
        console.log('service proxy error:');
        console.log(err);
        reject(err);
      });
  });
}
