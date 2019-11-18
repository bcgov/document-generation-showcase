const utils = {
  // Returns a pretty JSON representation of an object
  prettyStringify: obj => JSON.stringify(obj, null, 2),
  responseOk: status => status >= 200 && status <= 299,
  removeLeading: (s, c) => {
    if (!s || !c) return;
    return s.startsWith(c) ? s.substring(c.length, s.length) : s;
  },
  removeTrailing: (s, c) => {
    if (!s || !c) return;
    return s.endsWith(c) ? s.substring(0, s.length - c.length) : s;
  }
};

module.exports = utils;
