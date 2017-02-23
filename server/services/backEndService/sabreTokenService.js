'use strict';

const hooks = require('./hooks/flightDbHooks');
import TokenLogic from "../../backendModules/sessions/tokenLogic";

export default function () {
    const app = this;

    // Initialize our service with any options it requires
    app.use('/tokenService', new TokenLogic());

};
