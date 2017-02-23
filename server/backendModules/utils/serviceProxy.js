const request = require('request-promise');
const xml2json = require('basic-xml2json');


module.exports = function (ctx) {
  return new Promise((resolve, reject) => {
    // const resp =
    request.post({
      url: ctx.url,
      body: ctx.request,
      headers: {
        SoapAction: ctx.action,
        'Content-Type': ctx.contentType,
        'MIME-Version': '1.0',
      },
      accept: 'text/plain',
      rejectUnauthorized: false,
    })
    .then((resp) => {
      console.log(resp);
      const serviceResponse = xml2json.parse(resp);
      console.log(JSON.stringify(serviceResponse.root));
      // TODO:look at the console output then break down to send Reject
      resolve(serviceResponse);
    })
    .catch((err) => {
      console.log('service proxy error:');
      console.log(err);
      reject(err);
    });
  });
};
