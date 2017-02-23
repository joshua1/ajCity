import SessionModel from "../models/sessions";
import sessionCreateRQ from "../sabre_objects/soap/sessionCreate";
import serviceProxy from "../utils/serviceProxy";
import xml2json from "basic-xml2json";
import sessionManage from '../sabre_objects/soap/sessionManage';

const sessionMethods = {
  createSession() {
    return new Promise((resolve, reject) => {
      // sabre
      const ctx = {
        request: sessionCreateRQ(),
        url: process.env.SABRE_URL,
        action: 'SessionCreateRQ',
        contentType: 'text/xml'
      };
      serviceProxy(ctx)
        .then((newSess) => {
          console.log(newSess);
          const fault = xml2json.getContent(newSess.root, ['Envelope', 'Body', 'Fault', 'FaultString']);
          if (fault && fault !== '') {
            // deal with fault
            const theFault = fault;
            console.log(`the fault in our stars is ${theFault}`);
            reject(theFault);
          } else {
            // save the binarysessionToken, CPAId,
            const theToken = xml2json.getChildNode(newSess.root, ['Header', 'Security', 'BinarySecurityToken']);
            const tokenId = theToken.content;

            const sessObj = {};
            sessObj.isInUse = false;
            sessObj.tokenId = tokenId;
            sessObj.tokenDate = new Date();
            const newSession = new SessionModel(sessObj);
            newSession.save();

            console.log('New Session saved');
            resolve(sessObj);
          }
        })
        .catch((err) => {
          console.log(`An Error Occured ${err.toString()}`);
          reject(err);
        });
    });
  },
  refreshSession(sessionId) {
    return new Promise((resolve, reject) => {
      SessionModel.find().run()
        .then((sessionsResult) => {
          sessionsResult.map((sess) => {
            var ctx = {
              request: sessionManage(sess.tokenId),
              url: process.env.SABRE_URL,
              action: 'OTA_PingRQ',
              contentType: 'text/xml'
            };
            serviceProxy(ctx)
              .then((newSess) => {
                const fault = xml2json.getContent(newSess.root, ['Envelope', 'Body', 'Fault']);
                if (fault && (fault.FaultString !== '' || fault.FaultCode === 'soap-env:Client.InvalidSecurityToken')) {
                  this.removeSession(newSess.id);
                  console.log(`Fault encountered ${fault.FaultString}`);
                  this.createSession();
                } else {
                  console.log('Ping Successful');
                }
              })
              .catch((error) => {
                console.log(`Session ping error: ${error}`)
                reject(error);
              })
          });
        })
        .catch((error) => {
          console.log(`Session ping error ${error}`);
          reject(error);
        });
    });
  },
  removeSession(sessionId) {
    return new Promise((resolve, reject) => {
      SessionModel.get(sessionId).delete().run()
        .then((response) => {
          resolve(response);
        })
        .error((err) => {
          console.log(JSON.stringify(err));
          reject(err);
        });
    });
  },
  removeOldSessions() {
    return new Promise((resolve, reject) => {
      const yesterDay = Date.create().addDays(-1);
      SessionModel.filter(session => session('tokenDate').date().lt(yesterDay)
      ).run()
        .then((result) => {
          result.map(sess => sess.delete().then((response) => {
            console.log(`Session ${response.id}  deleted`);
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
  getNewSession() {
    return new Promise((resolve, reject) => {
      SessionModel.filter({
        isInUse: false
      }).limit(1).run()
        .then((result) => {
          console.log(result);
          if (result.length > 0) {
            return resolve(result[0]);
          }
          return this.createSession().then((newSession) => {
            SessionModel.get(newSession.id).update({
              isInUse: true
            }).run().then(result => {
              return resolve(newSession);
            });

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
      SessionModel.get(sessionId).update({
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

export default sessionMethods;
