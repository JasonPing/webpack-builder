const assert = require('assert');
const { entry } = require('../../lib/webpack.base.js');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js');

  console.log(baseConfig);
  it('entry', () => {
    assert.equal(
      baseConfig.entry.index,
      'D:/coding/webpack/my-project/builder-webpack/test/smoke/template/src/index/index.js'
    );
    assert.equal(
      baseConfig.entry.search,
      'D:/coding/webpack/my-project/builder-webpack/test/smoke/template/src/search/index.js'
    );
  });
});
