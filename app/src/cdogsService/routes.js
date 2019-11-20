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

function protector(token) {
  const hasUser = token.hasRole('dgrsc:user');
  // eslint-disable-next-line no-console
  console.log(`token.hasRole('dgrsc:user') = ${hasUser}`);
  return hasUser ;
}

routes.get('/health', keycloak.protect(protector), wrap(async function (req, res, next) {
  await healthCheck(req, res, next);
}));

module.exports = routes;
