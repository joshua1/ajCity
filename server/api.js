'use strict';

import path from 'path';
import compress from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
const hooks = require('feathers-hooks');
const batcher = require('feathers-batch');
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import socketio from 'feathers-socketio';
import middleware from './middleware';
import services from './services';


const api = feathers();

api.configure(configuration(path.join(__dirname, '..')));
api.use(compress())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use('/batch', batcher({
    limit: 10
  }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio({
    wsEngine: 'uws'
  }))
  .configure(services)
  .configure(middleware);




export default api;
