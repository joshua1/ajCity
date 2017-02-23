import SabreFlightApI from 'sabre-dev-studio';

let apiKey = 'V1:7971:J2QH:AA';
console.log(apiKey);
const sabreFlightAPi = new SabreFlightApI({
  client_id: apiKey,
  client_secret: 'WS013014',
  uri: `https://api-crt.cert.havail.sabre.com`
});
export default sabreFlightAPi;
