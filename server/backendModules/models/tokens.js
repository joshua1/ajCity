'use strict';

import dataService from '../db_config';

const thinky = dataService.thinky;
const type = thinky.type;

const TokenModel = thinky.createModel('Token', {
  isInUse: type.boolean(),
  tokenId: type.string(),
  tokenDate: type.date(),
  expiryDate:type.date()
});

export default TokenModel;
