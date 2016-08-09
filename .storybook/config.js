import * as storybook from '@kadira/storybook';

const req = require.context('./', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(req)
}

storybook.configure(loadStories, module);