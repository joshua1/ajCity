'use strict';
import FlightBookingLogic from "../../../backendModules/flights/flightBookingLogic";
const hooks = require('./../hooks/flightDbHooks');

module.exports = function () {
    const app = this;

    // TODO:use feathers-rethinky to take advantage of change feeds
    app.use('/flight/bookings', new FlightBookingLogic());

};
