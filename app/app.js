const compression = require('compression');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const Problem = require('api-problem');

const apiRoutes = require('./src/cdogsService/routes');
const log = require('./src/components/log')(module.filename);
const httpLogger = require('./src/components/log').httpLogger;

const state = {
  shutdown: false
};

const app = express();
app.use(compression());
app.use(express.json({ limit: config.get('server.bodyLimit') }));
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': [
          "'self'", // eslint-disable-line
          new URL(config.get('frontend.keycloak.serverUrl')).origin
        ]
      }
    }
  })
);

// Print out configuration settings in debug startup
log.debug('App configuration', config);

// Skip if running tests
if (process.env.NODE_ENV !== 'test') {
  app.use(httpLogger);
}

// Block requests if server is shutting down
app.use((_req, res, next) => {
  if (state.shutdown) {
    new Problem(503, { details: 'Server is shutting down' }).send(res);
  } else {
    next();
  }
});

const apiPath = config.get('server.apiPath');
app.use(apiPath, apiRoutes);

// Handle Static Files (frontend app)
// Expose endpoint to return frontend configuration
app.use('/config', (_req, res, next) => {
  try {
    const frontend = config.get('frontend');
    res.status(200).json(frontend);
  } catch (err) {
    next(err);
  }
});

// Host the compiled and static assets
const staticFilesPath = '/';
app.use(staticFilesPath, express.static(path.join(__dirname, 'frontend/dist')));

// Handle 500
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.stack) {
    log.error(err);
  }

  if (err instanceof Problem) {
    err.send(res, null);
  } else {
    new Problem(500, 'DGRSC-CDOGS Server Error', {
      detail: (err.message) ? err.message : err
    }).send(res);
  }
});

// Handle 404
app.use((req, res) => {
  if (req.originalUrl.startsWith(apiPath)) {
    // Return a 404 problem if attempting to access API
    new Problem(404, 'Page Not Found', {
      detail: req.originalUrl
    }).send(res);
  } else {
    // Redirect any non-API requests to static frontend
    res.redirect(staticFilesPath);
  }
});

// Prevent unhandled errors from crashing application
process.on('unhandledRejection', err => {
  if (err && err.stack) {
    log.error(err);
  }
});

// Graceful shutdown support
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGUSR1', shutdown);
process.on('SIGUSR2', shutdown);
process.on('exit', () => {
  log.info('Exiting...');
});

/**
 * @function shutdown
 * Shuts down this application after at least 3 seconds.
 */
function shutdown() {
  log.info('Received kill signal. Shutting down...');
  // Wait 3 seconds before starting cleanup
  if (!state.shutdown) setTimeout(cleanup, 3000);
}

/**
 * @function cleanup
 * Cleans up connections in this application.
 */
function cleanup() {
  log.info('Service no longer accepting traffic');
  state.shutdown = true;
  process.exit();
}

module.exports = app;
