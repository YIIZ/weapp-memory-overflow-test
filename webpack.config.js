const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: `${__dirname}/src`,
  resolve: {
    symlinks: false,
    modules: ['src', 'node_modules'],
  },
  entry: {
    game: './game.js',
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: `${process.env.PUBLIC || ''}`,
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/weapp-adapter'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'node_modules/@pixi/utils'),
      ],
      loader: '../fixPixiLoader',
    }],
  },
}
