const autoPrefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();

const setMPA = () => {
  // multi page compile, no need change webpack config when added/removed pages
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    // D:/coding/webpack/my-project/src/index/index.js
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    return htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        inject: true, // inject css js into html
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /.js$/, // js loader
        use: ['babel-loader'],
      },
      {
        test: /.css$/, // css loader
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.less$/, // less loader
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader', // css auto compile for different browsers
            options: {
              plugins: () => [autoPrefixer({})], // setting is in package.json browserslist option
            },
          },
          {
            loader: 'px2rem-loader', // px to rem
            options: {
              remUnit: 75,
              remPreceision: 8, // px to rem decimal point
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/, // file loader load image and font
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css', // extract css file
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(), // friendly error log
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') === -1
        ) {
          // console.log('build error');
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only', // minify output log
};
