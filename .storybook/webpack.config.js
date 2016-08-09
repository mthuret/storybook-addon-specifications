const path = require('path');

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
      }
    ],
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  }
};

module.exports = config;
