import feathers from "feathers/client";
import rx from "feathers-reactive";
import RxJS from "rxjs";
import authentication from 'feathers-authentication-client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import io from 'socket.io-client';

const socket = io(process.env.BASE_URL || 'http://localhost:3030', {
  transports: ['websocket']
});

const feathersClient = feathers()
  .configure(authentication({
    storage: window.localStorage
  }))
  .configure(socketio(socket, {
    timeout: 10000
  }))
  .configure(hooks())
  .configure(rx(RxJS))

export default feathersClient;
