"use strict";

var NO_FUNC = function NO_FUNC() {};

var snapshotStoriesOf = function snapshotStoriesOf() {
  var story = void 0;
  var api = {
    add: function add(name, func) {
      story = func();
      snapshot(name, story);
      return api;
    },
    addWithInfo: function addWithInfo(name, func) {
      story = func();
      snapshot(name, story);
      return api;
    }
  };
  return api;
};
var storiesOf = function storiesOf() {
  var api = {
    add: function add(name, func) {
      func();
      return api;
    },
    addWithInfo: function addWithInfo(name, func) {
      func();
      return api;
    }
  };
  return api;
};

var action = function action() {
  return NO_FUNC;
};
var linkTo = NO_FUNC;
var specs = function specs(spec) {
  return spec();
};

var snapshot = function snapshot(name, story) {
  it(name, function () {
    var renderer = require("react-test-renderer");
    var tree = renderer.create(story).toJSON();
    expect(tree).toMatchSnapshot();
  });
};

module.exports = {
  snapshotStoriesOf: snapshotStoriesOf,
  storiesOf: storiesOf,
  action: action,
  linkTo: linkTo,
  specs: specs,
  snapshot: snapshot
};