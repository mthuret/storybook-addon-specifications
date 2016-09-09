const path = require('path');
const methods = [
  'specs',
  'describe',
  'it',
  'beforeEach',
  'afterEach',
  'after',
  'before',
  'xit',
  'fit',
  'xdescribe',
];
const externals = {
  'jsdom': 'window',
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': 'window',
  'react/addons': true,
};
methods.forEach(m => externals[m] = true);

const testMethodLoader = {
  test: require.resolve('./'),
  loader: `expose-members?${methods.join(',')}`,
};

module.exports = {
  testMethodLoader,
  module: {
    loaders: [
      testMethodLoader,
    ],
  },
  resolve: {
    alias: {
      'storybook-addon-specifications': path.join(__dirname, '../dist'),
    },
  },
  externals,
};
