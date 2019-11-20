const config = require('config');
const utils = require('./utils');

const relatedLinks = {

  createHref: (req, path) => {
    const hostUrl = utils.removeTrailing(config.get('server.hostUrl'), '/');
    const baseUrl = utils.removeTrailing(utils.removeLeading(req.baseUrl, '/'), '/');
    const p = path ? path : req.path;
    const linkPath = utils.removeLeading(p, '/');

    const href = [hostUrl, baseUrl, linkPath].join('/');
    return utils.removeTrailing(href, '/');
  },

  createLink: (req, rel, method, path) => {
    const href = relatedLinks.createHref(req, path);
    if ('self'.toLowerCase() === rel.toLowerCase()) {
      return {rel: 'self', method: req.method.toUpperCase(), href: href};
    }
    return {rel: rel.toLowerCase(), method: method.toUpperCase(), href: href};
  },

  createLinks: (req, links) => {

    if (links && links.length > 0) {
      // if we passed in links, add self to front of the list
      links.unshift({r: 'self'});
    } else {
      // no links, always return self
      links = [{r: 'self'}];
    }

    const linksArray = links.map(l => relatedLinks.createLink(req, l.r, l.m, l.p));
    return linksArray;
  }


};

module.exports = {relatedLinks};
