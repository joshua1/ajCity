'use strict';

const hooks = require('./hooks/flightDbHooks');
import SessionLogic from '../../backendModules/sessions/sessionLogic';

export default function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/sessionService', new SessionLogic());

};
