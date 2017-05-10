'use strict';

const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = (env, ...flags) => ({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `bundle${env === 'prod' ? '.min' : ''}.js`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'flow'] },
        }],
      }
    ],
  },
  plugins: env === 'prod' ?
  [
    /* Production */
    new BabiliPlugin(),
  ] : [
    /* Development */
  ],
});
