import feathersClient from '../feathersClient';

module.exports = {

  // Restrict to authenticated users
  restrictToAuthenticated (to, from, next) {
    feathersClient.authenticate()
      .then(() => { next(); })
      .catch(() => { next('/login?redirect=' + to.path); });
  },

  // Restrict to unauthenticated users
  restrictToUnauthenticated (to, from, next) {
    feathersClient.authenticate()
      .then(() => { next(false); })
      .catch(() => { next(); });
  }

};
