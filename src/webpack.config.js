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

module.exports = {
  module: {
    loaders: [
      {
        test: require.resolve('./'),
        loader: `expose-members?${methods.join(',')}`,
      },
    ],
  },
};
