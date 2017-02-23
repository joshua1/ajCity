'use strict';

import dataService from '../db_config';

const thinky = dataService.thinky;
const type = thinky.type;

const SessionModel = thinky.createModel('Session', {
  isInUse: type.boolean(),
  tokenId: type.string(),
  tokenDate: type.date()
});

export default SessionModel;