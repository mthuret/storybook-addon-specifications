const path = require('path');
const specs = require("../dist/webpack.config");
const config = {
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.json?$/,
        loaders: ['json'],
        include: path.resolve(__dirname, '../'),
      },
      specs.testMethodLoader,
    ],
  },
  resolve: {
    alias: specs.resolve.alias,
  },
  externals: specs.externals,
};

module.exports = config;
