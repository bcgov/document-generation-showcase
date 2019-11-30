const log = require('npmlog');

const keycloak = require('../components/keycloak');
const { relatedLinks } = require('../components/relatedLinks');
const routes = require('express').Router();
const wrap = require('../middleware/wrap');

const { healthCheck, docGen } = require('./controller');

const protector = token => {
  const hasUser = !!token.content.resource_access && token.hasApplicationRole('dgrsc', 'user');
  log.verbose('protector', `Token has Application Role "user" in "dgrsc" = ${hasUser}`);
  return hasUser;
};

routes.get('/', wrap((req, res) => {
  res.status(200).json({
    links: relatedLinks.createLinks(req, [
      { r: 'health', m: 'GET', p: '/health' },
      { r: 'docgen', m: 'POST', p: '/docGen' }
    ])
  });
}));

routes.get('/health', keycloak.protect(protector), wrap(async (req, res, next) => {
  await healthCheck(req, res, next);
}));

routes.post('/docGen', /*keycloak.protect(protector),*/ wrap(async (req, res, next) => {
  await docGen(req, res, next);
}));

module.exports = routes;
