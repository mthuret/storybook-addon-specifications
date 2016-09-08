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

methods.forEach(m => externals[m] = true);

console.log("EXTERNALS", externals);

export const testMethodLoader = {
  test: require.resolve('./'),
  loader: `expose-members?${methods.join(',')}`,
};
