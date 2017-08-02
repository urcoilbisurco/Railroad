//loading .env variables in process.env
require('dotenv').config()
// index.js
var path = require('path');
global.appRoot = path.resolve(__dirname);


const http = require('http');
const express = require('express');
const configureServer = require('./config/init.js');

const SERVER_CONFIGS = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3600,
};

const app = express();
configureServer(app);

var server=http.createServer(app)
server.listen(SERVER_CONFIGS.PORT);
console.log("listening on http://localhost:"+SERVER_CONFIGS.PORT)
