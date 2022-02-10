const path = require('path');
const constants = require('./constants');
const miniCss = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildType = process.env.BUILD_TYPE
  ? process.env.BUILD_TYPE
  : constants.modes.dev;

const result = {};

result.plugins = [
  new miniCss({
    filename: 'styles.css',
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../src/index.html'),
    minify: buildType === constants.modes.dev ? false : true,
  }),
];

result.module = {
  rules: [
    { test: /\.(s*)css$/, use: [miniCss.loader, 'css-loader', 'sass-loader'] },
    {
      test: /\.html$/i,
      loader: 'html-loader',
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
      type: 'asset/resource',
    },
  ],
};

if (buildType === constants.modes.prod) {
  result.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

module.exports = result;
