'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mocks = exports.xdescribe = exports.fit = exports.xit = exports.before = exports.after = exports.afterEach = exports.beforeEach = exports.it = exports.describe = exports.specs = exports.register = exports.EVENT_ID = exports.PANEL_ID = exports.ADDON_ID = undefined;

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
Object.defineProperty(exports, 'beforeEach', {
  enumerable: true,
  get: function get() {
    return _preview.beforeEach;
  }
});
Object.defineProperty(exports, 'afterEach', {
  enumerable: true,
  get: function get() {
    return _preview.afterEach;
  }
});
Object.defineProperty(exports, 'after', {
  enumerable: true,
  get: function get() {
    return _preview.after;
  }
});
Object.defineProperty(exports, 'before', {
  enumerable: true,
  get: function get() {
    return _preview.before;
  }
});
Object.defineProperty(exports, 'xit', {
  enumerable: true,
  get: function get() {
    return _preview.xit;
  }
});
Object.defineProperty(exports, 'fit', {
  enumerable: true,
  get: function get() {
    return _preview.fit;
  }
});
Object.defineProperty(exports, 'xdescribe', {
  enumerable: true,
  get: function get() {
    return _preview.xdescribe;
  }
});

var _mocks2 = require('./mocks');

var _mocks = _interopRequireWildcard(_mocks2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// addons, panels and events get unique names using a prefix
var ADDON_ID = exports.ADDON_ID = 'storybook-addon-specifications';
var PANEL_ID = exports.PANEL_ID = ADDON_ID + '/specifications-panel';
var EVENT_ID = exports.EVENT_ID = ADDON_ID + '/specifications-event';

exports.mocks = _mocks;