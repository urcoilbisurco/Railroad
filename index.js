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
  PORT: process.env.PORT || 8080,
};

const app = express();
configureServer(app);

var server=http.createServer(app)
server.listen(SERVER_CONFIGS.PORT);

var read = require('node-readability');

read('http://howtonode.org/really-simple-file-uploads', function(err, article, meta) {
  // Main Article
  console.log(article.content);
  // Title
  console.log(article.title);

  // // HTML Source Code
  // console.log(article.html);
  // // DOM
  // console.log(article.document);
  //
  // // Response Object from Request Lib
  // console.log(meta);
  //
  // Close article to clean up jsdom and prevent leaks
  article.close();
});
