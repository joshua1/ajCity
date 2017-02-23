'use strict';

import {userInGroup} from '../../../hooks';
import hooks from'feathers-hooks';
import  feathersAuth from 'feathers-authentication';

const auth=feathersAuth.hooks;

module.exports.beforeAdminHooks = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
      userInGroup('admin')
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: 'id' }),
      userInGroup('admin')
  ],
  create: [
    auth.hashPassword(),
      userInGroup('admin')
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: 'id' }),
      userInGroup('admin')
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: 'id' }),
      userInGroup('admin')
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: 'id' }),
      userInGroup('admin')
  ]
};

module.exports.afterAdminHooks = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
