const webpack = require('webpack');
const path = require('path');
const process = require('process');

const API_BASE = process.env.API_BASE;

const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

const dotCssLoaders = [
  'style?sourceMap',
  'css?modules',
];

module.exports = {
  context: path.resolve(__dirname),
  entry: 'index',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',

    publicPath: 'dist/',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        loaders: dotCssLoaders,
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loaders: [].concat(dotCssLoaders).concat(['sass']),
      },
    ],
  },

  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_API_BASE: JSON.stringify(API_BASE || 'localhost:8080/'),
    }),
    new FlowStatusWebpackPlugin(),
  ],
};
