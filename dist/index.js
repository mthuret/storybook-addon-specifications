'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manager = require('./manager');

Object.defineProperty(exports, 'register', {
  enumerable: true,
  get: function get() {
    return _manager.register;
  }
});

var _preview = require('./preview');

Object.defineProperty(exports, 'specs', {
  enumerable: true,
  get: function get() {
    return _preview.specs;
  }
});
Object.defineProperty(exports, 'describe', {
  enumerable: true,
  get: function get() {
    return _preview.describe;
  }
});
Object.defineProperty(exports, 'it', {
  enumerable: true,
  get: function get() {
    return _preview.it;
  }
});
// addons, panels and events get unique names using a prefix
var ADDON_ID = exports.ADDON_ID = 'storybook-addon-specifications';
var PANEL_ID = exports.PANEL_ID = ADDON_ID + '/specifications-panel';
var EVENT_ID = exports.EVENT_ID = ADDON_ID + '/specifications-event';