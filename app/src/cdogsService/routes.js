const { relatedLinks } = require('../components/relatedLinks');
const routes = require('express').Router();
// const wrap = require('../middleware/wrap');

const { healthCheck, docGen } = require('./controller');
const { authenticate } = require('../middleware/authentication');

routes.get('/', (req, res) => {
  res.status(200).json({
    links: relatedLinks.createLinks(req, [
      { r: 'health', m: 'GET', p: '/health' },
      { r: 'docgen', m: 'POST', p: '/docGen' }
    ])
  });
});

routes.get('/health', authenticate, (req, res, next) => {
  healthCheck(req, res, next);
});

routes.post('/template/render', authenticate, (req, res, next) => {
  docGen(req, res, next);
});

module.exports = routes;
