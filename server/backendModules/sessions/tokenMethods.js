import TokenModel from "../models/tokens";
import request from "request-promise";

const processTokenData = function(result, data) {};
const tokenMethods = {
  createToken() {
    return new Promise((resolve, reject) => {
      console.log('token get started');
      const theHeaders = {
        authorization: `Basic ${process.env.SABRE_ENCODED}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
      };

      return request.post({
        url: `${process.env.SABRE_REST_URI}/v2/auth/token`,
        headers: theHeaders,
        form: {
          grant_type: 'client_credentials'
        }
      })
        .then((tokenResult) => {
          const tokenObject = JSON.parse(tokenResult);
          const tokenObj = {};
          tokenObj.isInUse = false;
          tokenObj.tokenId = tokenObject.access_token;
          tokenObj.tokenDate = new Date();
          tokenObj.expiryDate = new Date().addDays(tokenObject.expires_in / 86400);
          const newToken = new TokenModel(tokenObj);
          TokenModel.save(newToken);
          console.log('New Token saved ');
          console.log(JSON.stringify(tokenObj));
          return resolve(tokenResult);
        })
        .catch((error) => {
          console.log(`Token request error : ${error}`);
          return reject(error)
        });
    });
  },
  removeToken(sessionId) {
    return new Promise((resolve, reject) => {
      TokenModel.get(sessionId).delete().run()
        .then((response) => {
          resolve(response);
        })
        .error((err) => {
          console.log(JSON.stringify(err));
          reject(err);
        });
    });
  },
  removeOldTokens() {
    return new Promise((resolve, reject) => {
      const today = Date.create();
      TokenModel.filter(session => session('expiryDate').date().lt(today)
      ).run()
        .then((result) => {
          result.map(sess => sess.delete().then((response) => {
            console.log(`Token ${response.id}  deleted`);
          })
          );
          resolve(result);
        })
        .error((unexpectedError) => {
          console.log(`Unexpected Error ${unexpectedError}`);
          reject(unexpectedError);
        });
    });
  },
  getNewToken() {
    return new Promise((resolve, reject) => {
      TokenModel.filter({
        isInUse: false
      }).limit(1).run()
        .then((result) => {
          console.log(result);
          if (result.length > 0) {
            return resolve(result[0]);
          }
          return this.createToken().then((newToken) => {
            TokenModel.get(newToken.id).update({
              isInUse: true
            }).run();
            return resolve(newToken);
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  setAsInuse(sessionId) {
    return new Promise((resolve, reject) => {
      TokenModel.get(sessionId).update({
        isInUse: true
      }).run()
        .then((result) => {
          if (result.errors.length > 1) {
            return reject(result.first_error);
          }
          return resolve(sessionId);
        });
    });
  }
};

export default tokenMethods;
