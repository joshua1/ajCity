'use strict';

import path from "path";
import middleware from './middleware';
import serveStatic from "feathers";
import feathers from "feathers";
import favicon from "serve-favicon";
import compress from "compression";
import cors from "cors";
import configuration from "feathers-configuration";
import bodyParser from "body-parser";
import { configureDb } from "./backendModules/db_config.js";
import cronJobs from "./backendModules/cron_jobs";
import configureMarkups from "./backendModules/seed_Markups.js";
import env from "dotenv";
import eyes from "eyes";
import Sugar from "sugar";
import api from "./api";

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));
app.set('query parser', 'extended');
app.use(compress())
  .options('*', cors())
  .use(cors())
  .use('/api', api)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(require('connect-history-api-fallback')())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  .use('/', serveStatic(app.get('public')))

  .configure(middleware);

const inspect = eyes.inspector({
  styles: {
    all: 'magenta'
  }
});
global.inspect = inspect;
global.Sugar = Sugar;
global.Sugar.extend();
Date.setLocale('en-GB');

env.config();

// configure the database switch to deepstream usage
configureDb();
// seed markups
configureMarkups();
// Set up Cron Jobs

cronJobs(true);



module.exports = app;
