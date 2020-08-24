const { merge } = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // webpack hot refresh
  ],
  devServer: {
    contentBase: './dist',
    hot: true, // webpack hot refresh,
    stats: 'errors-only', // minify output log
  },
  devtool: 'inline-source-map', // eval: source map in js, source-map: separate map, inline-source-map: inline code in js
};
module.exports = merge(baseConfig, devConfig);
