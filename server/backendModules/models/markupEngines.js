'use strict';

const dataService = require('../db_config');

const thinky = dataService.thinky;
const type = thinky.type;

const MarkupsEngine = thinky.createModel('MarkupEngines', {
  engineName: type.string(),
  isActive: type.boolean().default(true),
});
export default MarkupsEngine;
