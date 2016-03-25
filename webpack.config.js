var webpack = require('webpack');

module.exports = {
  entry: './src/index',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: 'dist/redux-pagination.min.js',
    libraryTarget: 'umd',
    library: 'redux-pagination'
  }
};