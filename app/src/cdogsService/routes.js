const keycloak = require('../components/keycloak');
const {relatedLinks} = require('../components/relatedLinks');
const routes = require('express').Router();
const wrap = require('../middleware/wrap');

const {healthCheck} = require('./controller');

routes.get('/', wrap(function (req, res) {
  res.status(200).json({
    links: relatedLinks.createLinks(req, [
      {r: 'health', m: 'GET', p: '/health'}
    ])
  });
}));

routes.get('/health', keycloak.protect(), wrap(async function (req, res, next) {
  await healthCheck(req, res, next);
}));

module.exports = routes;
