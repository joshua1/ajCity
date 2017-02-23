'use strict';

const hooks = require('./hooks/flightDbHooks');
import BankAccountLogic from '../../backendModules/admin/bankAccountLogic';

export default function () {
  const app = this;

  // Use Feathers-rethinky
  app.use('bankAccount', new BankAccountLogic());

  // Get our initialize service to that we can bind hooks
  const bankAccountService = app.service('bankAccount');

  // Set up our before hooks
 // userService.before(hooks.before);

  // Set up our after hooks
 // userService.after(hooks.after);
};
