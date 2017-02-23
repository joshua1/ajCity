'use strict';
import BankAccountModel from '../models/bankAccount';

export default class BankAccountLogic {
    find(params) {
        return new Promise((resolve, reject) => {
            BankAccountModel.run().then((result) => {
                return resolve(result);
            })
                .catch((error) => {
                    console.log('bank account retrieval error');
                    return reject(error);
                })
        });
    }

    get(id, params) {
        return Promise.resolve({
            id,
            text: `A new message with ID: ${id}!`,
        });
    }

    create(data, params) {
        if (Array.isArray(data)) {
            return Promise.all(data.map(current => this.create(current)));
        }
        return Promise.resolve(data);
    }

    update(id, data, params) {
        return Promise.resolve(data);
    }

    patch(id, data, params) {
        return Promise.resolve(data);
    }

    remove(id, params) {
        return Promise.resolve({
            id,
        });
    }

}

