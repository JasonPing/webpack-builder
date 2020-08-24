const cassnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/, // css loader
        use: 'ignoer-loader',
      },
      {
        test: /\.less$/, // css loader
        use: 'ignoer-loader',
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cassnano,
    }),
    // new HtmlWebpackExternalsPlugin({
    //   // extract react ,react-dom dependency with cdn
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://unpkg.com/react@16/umd/react.production.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry:
    //         "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    //       global: "ReactDom",
    //     },
    //   ],
    // }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // min reference file size
      cacheGroups: {
        commons: {
          // use splitchunks extract react and react-dom
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        },
        // commons: {
        //   // use splitchunks extract js referenced more than twice
        //   name: 'common',
        //   chunks: 'all',
        //   minChunks: 2, // min reference time
        // },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
