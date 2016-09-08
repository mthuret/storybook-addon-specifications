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

export const externals = {
  'jsdom': 'window',
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': 'window',
  'react/addons': true,
};

export const testMethodLoader = {
  test: require.resolve('./'),
  loader: `expose-members?${methods.join(',')}`,
};
