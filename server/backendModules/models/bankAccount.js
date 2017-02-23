'use strict';

const dataService = require('../db_config');

const thinky = dataService.thinky;
const type = thinky.type;

const BankAccountModel = thinky.createModel('BankAccount', {
    accountName: type.string(),
    bankName: type.string(),
    accountNumber: type.string()
});
export default BankAccountModel;
