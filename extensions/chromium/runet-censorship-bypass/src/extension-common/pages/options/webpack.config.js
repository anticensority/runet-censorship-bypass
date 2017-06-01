'use strict';

const path = require('path');
//const BabiliPlugin = require('babili-webpack-plugin');

module.exports = (env, ...flags) => ({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `bundle.min.js`,
    publicPath: './dist/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['flow'],
              plugins: [
                'dynamic-import-webpack',
                'inferno',
              ],
            },
          },
          /*{
            loader: './lib/transform-loader?csjs-injectify',
          },*/
        ],
      }
    ],
  },

  resolve: {
    aliasFields: [],
  },

  plugins: env === 'prod' ?
  [
    /* Production */
    //new BabiliPlugin(),
  ] : [
    /* Development */
  ],
});
