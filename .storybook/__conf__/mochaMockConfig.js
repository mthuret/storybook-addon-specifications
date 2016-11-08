const {storiesOf, action, linkTo, specs} = require("../../dist/mocks");
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.specs = specs;

import { jsdom } from 'jsdom';

/**
 * Mocking browser-like DOM
 */
global.document = jsdom('<!doctype html><html><body></body></html>', {
  headers: {
    'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7)' +
    ' AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24'
  }
});
global.window = document.defaultView;
global.navigator = global.window.navigator;
