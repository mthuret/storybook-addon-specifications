const NO_FUNC = () => {};

const snapshotStoriesOf = function snapshotStoriesOf() {
  let story;
  const api = {
    add(name, func) {
      story = func();
      snapshot(name, story);
      return api;
    },
    addWithInfo(name, func) {
      story = func();
      snapshot(name, story);
      return api;
    },
  };
  return api;
};
const storiesOf = function storiesOf() {
  const api = {
    add(name, func) {
      func();
      return api;
    },
    addWithInfo(name, func) {
      func();
      return api;
    },
  };
  return api;
};

const action = () => NO_FUNC;
const linkTo = NO_FUNC;
const specs = spec => spec();

const snapshot = (name, story) => {
    it(name, function () {
      const renderer = require("react-test-renderer");
      const tree = renderer.create(story).toJSON();
      expect(tree).toMatchSnapshot();
    });
};

module.exports = {
  snapshotStoriesOf,
  storiesOf,
  action,
  linkTo,
  specs,
  snapshot,
};
