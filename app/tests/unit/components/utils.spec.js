const helper = require('../../common/helper');
const utils = require('../../../src/components/utils');

helper.logHelper();

describe('prettyStringify', () => {
  it('should return a string', () => {
    const result = utils.prettyStringify({});

    expect(result).toBeTruthy();
    expect(result).toMatch('{}');
  });
});
