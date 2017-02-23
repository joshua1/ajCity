'use strict';

import {beforeAdminHooks, afterAdminHooks} from "./hooks/flightDbHooks";
import AdminLogic from "../../backendModules/admin/adminLogic";

export default function () {
    const app = this;

    // Use feathers-rethinky
    app.use('admin/users', new AdminLogic());

    // Get our initialize service to that we can bind hooks
    const userService = app.service('admin/users');

    // Set up our before hooks
    userService.before(beforeAdminHooks);

    // Set up our after hooks
    userService.after(afterAdminHooks);
};
