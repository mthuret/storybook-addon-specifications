import * as storybook from '@kadira/storybook';
import 'storybook-addon-specifications';

const req = require.context('./', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(req)
}

storybook.configure(loadStories, module);
