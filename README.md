# Specifications Addon [![npm version](https://img.shields.io/npm/v/storybook-addon-specifications.svg)](https://www.npmjs.com/package/storybook-addon-specifications)

This addon for storybook will allow you to write tests based on your stories and display results directly inside storybook.

If you want to learn more about the ideas behind this addon, you can read [this article](https://medium.com/@mlthuret/building-a-react-components-living-documentation-using-react-storybook-5f11f0e7d23e#.5g58g5i3t).

**needs at least [react-storybook](https://github.com/kadirahq/react-storybook) 2.2.0**

![](docs/screenshot.png)

## Getting Started

First, install the addon

```shell
npm install -D storybook-addon-specifications
```

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'storybook-addon-specifications/register';
```

Import the `specs, describe and it` functions and use it to write your tests. This example uses Enzyme and Chai to perform the testing.

The first parameter of the describe function **must be the same** as the story's name.

```js
import { storiesOf } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'

import {mount} from "enzyme";
import expect from "expect";

const stories = storiesOf('Button', module);

stories.add('Hello World', function () {
  const helloWorldStory =
    <button onClick={action('Hello World')}>
      Hello World
    </button>;

  specs(() => describe('Hello World', function () {
    it('Should have the Hello World label', function () {
      let output = mount(helloWorldStory);
      expect(output.text()).toContain('Hello Wrld');
    });

    it('Should have the Hello World label', function () {
      let output = mount(helloWorldStory);
      expect(output.text()).toContain('Hello World');
    });
  }));

  return helloWorldStory;
});
```

Note : if you use enzyme, you'll need to add the following  configuration to your webpack.config.js file. You also needs to add the json library to your dev dependencies. 

```
externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  }
```

## Use your stories with you CI

Writing tests directly next to the component declaration for the story is already a great thing, but it would be better if those tests can be reused with our CI.

To do that, the idea is to add to your test runner, all the files used for declaring stories.
But because this addon redefine describe and it functions, you'll need some extra-configuration to make the tests pass within the test runner.
You'll also need to change a little bit your stories declaration (see ./.storybook/__tests__/sample.ci.jest.stories.js file as an example)

You'll find in this directory examples using JEST or MOCHA.

### Using JEST

You can use the mocking functionality of jest to switch between the real describe and it implementation of jest or
the specifications addon one.

Inside .storybook, you can add a facade.js file with the following content :

```js
import {storiesOf as storiesOfReal, action as actionReal, linkTo as linkToReal} from "@kadira/storybook"
import { specs as specsReal, describe as describeReal, it as itReal } from 'storybook-addon-specifications'

export const storiesOf = storiesOfReal;
export const action = actionReal;
export const linkTo = linkToReal;
export const specs = specsReal;
export const describe = describeReal;
export const it = itReal;
```

Create a __mocks__ directory within .storybook and add also a facade.js file.

```js
export const storiesOf = function storiesOf() {
  var api = {};
  api.add = ()=> { return api; };
  api.addWithInfo = ()=> { return api; };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;
```

Create also a jest config file with the following content :

```js
jest.mock('./.storybook/facade');
```

**Inside your stories file you'll use the .storybook/facade.js file for imports**.

Finally add this to your jest configuration :

```js
"jest":{
    "setupFiles": [
      "./path/to/your/jest/config/file.js"
    ],
    "automock": false,
    }
```

### Using Mocha

Create the same facade.js file than for the jest configuration

Create wherever you want a new file that will mock the storybook api

```js
export const storiesOf = function storiesOf() {
  var api = {};
  api.add = ()=> { return api; };
  api.addWithInfo = ()=> { return api; };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const describe = describe;
export const it = it;
```

Then create or add those line to a mocha config file :

```js
import {storiesOf, action, linkTo, describe, it} from "path/to/your/mock/file";
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.describe = describe;
global.it = it;
```

Finally add this to your mocha running script

```
-w test/path/to/your/config/file.js
```
