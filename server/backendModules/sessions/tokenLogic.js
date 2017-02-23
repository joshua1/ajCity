'use strict';
import tokenMethods from "./TokenMethods";

export default class TokenLogic {
    find(params) {
        params = params || {};
        return new Promise((resolve, reject) => {
            tokenMethods.getNewToken().then(result => {
                console.log(result);
                return resolve(result);
            }).catch(err => {
                console.log(`Get Token error ${err}`);
                reject(err)
            });
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
