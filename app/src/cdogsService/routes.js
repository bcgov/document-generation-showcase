const log = require('../../src/components/log')(module.filename);

const keycloak = require('../components/keycloak');
const { relatedLinks } = require('../components/relatedLinks');
const routes = require('express').Router();
const config = require('config');
// const wrap = require('../middleware/wrap');

const { healthCheck, docGen } = require('./controller');

const protector = token => {
  if(config.has('server.keycloak.role')) {
    const hasUser = !!token.content.resource_access && token.hasApplicationRole('dgrsc', config.get('server.keycloak.role'));
    log.verbose(`Token has Application Role "user" in "dgrsc" = ${hasUser}`, { function: 'protector' });
    return hasUser;
  }
  return true;
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
