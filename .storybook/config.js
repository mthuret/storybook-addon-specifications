import * as storybook from '@kadira/storybook';


//THIS IS NEEDED ONLY IF YOU ARE USING MOCHA AS A TEST RUNNER

import {storiesOf, action, linkTo, specs, describe, it,
after, before, beforeEach, afterEach} from "./facade";

global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.specs = specs;
global.describe = describe;
global.it = it;
global.after = after;
global.before = before;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

// END OF SPECIFIC MOCHA CONF

const req = require.context('./', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(req)
}

storybook.configure(loadStories, module);