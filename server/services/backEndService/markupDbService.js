'use strict';

const hooks = require('./hooks/flightDbHooks');
const MarkupLogic = require('../../backendModules/admin/markupLogic');

export default function () {
  const app = this;

  // use feathers-rethinky
  app.use('markups', new MarkupLogic());

  // Get our initialize service to that we can bind hooks
  const markupService = app.service('markups');

  // Set up our before hooks
  markupService.before(hooks.before);

  // Set up our after hooks
  markupService.after(hooks.after);
};
