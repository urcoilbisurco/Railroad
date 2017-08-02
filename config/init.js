// const cors = require('cors');
const bodyParser = require('body-parser');

const routes=require("../app/routes");

const configureServer = app => {
  app.set('port', (process.env.PORT));
  app.use(require('morgan')('combined'));
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({extended: true}));     // to support URL-encoded bodies
  app.use("/api", routes);
};

module.exports = configureServer;
