const log = require('npmlog');

const keycloak = require('../components/keycloak');
const { relatedLinks } = require('../components/relatedLinks');
const routes = require('express').Router();
// const wrap = require('../middleware/wrap');

const { healthCheck, docGen } = require('./controller');

const protector = token => {
  const hasUser = !!token.content.resource_access && token.hasApplicationRole('dgrsc', 'user');
  log.verbose('protector', `Token has Application Role "user" in "dgrsc" = ${hasUser}`);
  return hasUser;
};

routes.get('/', (req, res) => {
  res.status(200).json({
    links: relatedLinks.createLinks(req, [
      { r: 'health', m: 'GET', p: '/health' },
      { r: 'docgen', m: 'POST', p: '/docGen' }
    ])
  });
});

routes.get('/health', keycloak.protect(protector), (req, res, next) => {
  healthCheck(req, res, next);
});

routes.post('/template/render', keycloak.protect(protector), (req, res, next) => {
  docGen(req, res, next);
});

module.exports = routes;
