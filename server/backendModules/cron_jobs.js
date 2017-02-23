'use strict';

import Runnr from "node-runnr";
import newSession from "./sessions/sessionMethods";
import tokenLogic from "./sessions/tokenMethods";

const cs = newSession.createSession;
const rs = newSession.refreshSession;
const ros = newSession.removeOldSessions;

const Jobs = new Runnr();

module.exports = function(toRun) {
  // configure cron Jobs
  if (toRun) {

    console.log('cron jobs configuration started');
    Jobs.interval('session_create', '50:0')
      .job(cs)
      .then(result => console.log(result))
      .exit(() => console.log('new session create Job exit'));

    Jobs.interval('session_refresh', '10:0')
      .job(rs)
      .then(result => console.log(result))
      .exit(() => console.log('Session refresh done')); // TODO:throw in slack hook later

    Jobs.interval('session_clearOld', '120:0')
      .job(ros)
      .then(result => console.log(`old sessions removal ${result}`)
        .exit(() => console.log('Old Session removal exit')));

    Jobs.interval('token_create', '50:0')
      .job(tokenLogic.createToken)
      .then(result => console.log(result))
      .exit(() => console.log('New token Job exited'));
    Jobs.interval('token_clearold', '50:0')
      .job(tokenLogic.removeOldTokens)
      .then(result => console.log(result))
      .exit(() => console.log('New token Job exited'));

    cs();
    rs();
    ros();
    tokenLogic.createToken();

    return Jobs.begin();
  }
};
