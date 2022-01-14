const utils = require('../../../src/components/utils');

describe('prettyStringify', () => {
  it('should return a string', () => {
    const result = utils.prettyStringify({});

    expect(result).toBeTruthy();
    expect(result).toMatch('{}');
  });
});
