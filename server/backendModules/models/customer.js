'use strict';

const dataService = require('../db_config');

const thinky = dataService.thinky;
const type = thinky.type;


module.exports.customerMessages = thinky.createModel('CustomerMessages', {

});
module.exports.MessagesThread = thinky.createModel('MessagesThread', {

});
