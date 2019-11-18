const config = require('config');
const cors = require('cors');
const express = require('express');
const log = require('npmlog');
const morgan = require('morgan');
var path = require('path');
const Problem = require('api-problem');

const apiRoutes = require('./src/cdogsService/routes');
const keycloak = require('./src/components/keycloak');
const utils = require('./src/components/utils');

const state = {
  isShutdown: false
};

const app = express();

app.use(express.json({limit: config.get('server.bodyLimit')}));
app.use(express.urlencoded({extended: true}));


app.use(cors());
app.options('*', cors());

app.use(morgan(config.get('server.morganFormat')));

log.level = config.get('server.logLevel');
log.addLevel('debug', 1500, {fg: 'green'});

// Print out configuration settings in verbose startup
log.verbose(utils.prettyStringify(config));

// Use Keycloak OIDC Middleware
app.use(keycloak.middleware());

const apiPath = config.get('server.apiPath');
app.use(apiPath, apiRoutes);

// start of handling static files - the frontend app.
// ... expose an endpoint to return configuration
// eslint-disable-next-line no-unused-vars
app.use(`${config.get('frontend.basePath')}/config`, (req, res, next) => {
  const frontend = config.get('frontend');
  res.status(200).json(frontend);
});

// host the compiled/static web application here...
const staticFilesPath = config.get('frontend.basePath');
const staticFileMiddleware = express.static(path.join(__dirname, 'frontend/dist'));
app.use(staticFilesPath, staticFileMiddleware);

// Handle 500
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  if (err.stack) {
    log.error(err.stack);
  }

  if (err instanceof Problem) {
    err.send(res, null);
  } else {
    let p = new Problem(500, 'DGRSC-CDOGS Server Error', {detail: err.message});
    p.send(res, null);
  }
});

// Handle 404
app.use(function (req, res) {
  if (req.originalUrl.startsWith(apiPath)) {
    let p = new Problem(404, 'Page Not Found', {detail: req.originalUrl});
    p.send(res, null);
  } else {
    // any non-api urls, let's just send into the app
    res.redirect(staticFilesPath);
  }
});

// Prevent unhandled errors from crashing application
process.on('unhandledRejection', err => {
  log.error(err.stack);
});

// Graceful shutdown support
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  if (!state.isShutdown) {
    log.info('Received kill signal...');
    log.info('...Time to die.');
    state.isShutdown = true;
    //
    // if we had a db connection, we would shut it down here.
    //
    // Wait 3 seconds before hard exiting
    setTimeout(() => process.exit(), 3000);
  }
}

module.exports = app;
