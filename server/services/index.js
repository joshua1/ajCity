'use strict';

const authentication = require('./authentication/index');
const user = require('./user/index');
import markupService from "./backEndService/markupDbService";
import sessionService from "./backEndService/sabreSessionService";
import flightSearchService from "./backEndService/flight/flightSearchService";
import airportListService from "./backEndService/flight/airportListService";
import flightBookingService from "./backEndService/flight/flightBookingService";
import adminService from "./backEndService/adminDbService";
import bankService from "./backEndService/bankAccountsDBService";
import tokenService from './backEndService/sabreTokenService';

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(markupService);
  app.configure(sessionService);
  app.configure(adminService);
  app.configure(bankService);
  app.configure(flightSearchService);
  app.configure(airportListService);
  app.configure(flightBookingService);
  app.configure(tokenService);
};
