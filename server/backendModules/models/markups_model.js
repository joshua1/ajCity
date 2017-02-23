'use strict';

const dataService = require('../db_config');

const thinky = dataService.thinky;
const type = thinky.type;

const MarkupsModel = thinky.createModel('Markups', {
  airline: type.string(),
  airlineCode: type.string(),
  dealCode: type.string(),
  serial: type.number().integer().optional(),
  dealOps: type.string().optional(),
  mark: type.string().optional(),
  figure: type.number().optional(),
  destination: type.array().schema(type.string()).optional(),
  travelClass: type.array().schema(type.string()).optional(),
  travelClassException: type.array().schema(type.string()).optional(),
  destinationException: type.array().schema(type.string()).optional(),
  isAgentMarkup: type.boolean().default(false),
  agentId: type.string().optional(), // define agent relationship later
  isActive: type.boolean().default(true),
  markupEngineId: type.string(), // defaults to Sabre when created
});
export default MarkupsModel;