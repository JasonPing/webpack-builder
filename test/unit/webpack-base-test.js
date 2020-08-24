const assert = require("assert");
const path = require("path");
const projectRoot = process.cwd();

const { entry } = require("../../lib/webpack.base.js");

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base.js");

  console.log(baseConfig);
  it("entry", () => {
    assert.equal(baseConfig.plugins[1].cleanStaleWebpackAssets, true);
    assert.equal(baseConfig.plugins[1].protectWebpackAssets, true);
  });
});
