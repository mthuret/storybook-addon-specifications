const fs = require('fs')
const path = require('path')
const jest = require('jest-cli')
const getPackageRoot = require('jest-util').getPackageRoot;

jest.runCLI({ watchAll: false, verbose: true, testResultsProcessor: path.join(__dirname, 'jest-recorder') }, getPackageRoot(), (result) => {
  // fs.writeFile('./result.json', JSON.stringify(result, null, 2) , 'utf-8');
});
