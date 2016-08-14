# Specifications Addon [![npm version](https://img.shields.io/npm/v/storybook-addon-specifications.svg)](https://www.npmjs.com/package/storybook-addon-specifications)

> **Needs at least [react-storybook](https://github.com/kadirahq/react-storybook) 2.2.0**

This addon for storybook will allow you to write tests based on your stories and display results directly inside storybook.

> **If you want to learn more about the ideas behind this addon, you can read this article : [Building a react components living documentation using react-storybook.](https://medium.com/@mlthuret/building-a-react-components-living-documentation-using-react-storybook-5f11f0e7d23e#.5g58g5i3t).**

![](docs/screenshot.png)

## Table of contents

* [Getting Started](#getting-started)
* [Use your stories with your ci](#use-your-stories-with-your-ci)
  * [Using JEST](#using-jest)
  * [Using Mocha](#using-mocha)

## Getting Started

First, install the addon

```shell
npm install -D storybook-addon-specifications
```

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'storybook-addon-specifications/register';
```

Import the `specs, describe and it` functions and use it to write your tests. This example uses *enzyme* and *expect* to perform the testing.

The first parameter of the describe function **must be the same** as the story's name.

```js
import { storiesOf } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'

import {mount} from "enzyme";
import expect from "expect";

const stories = storiesOf('Button', module);

stories.add('Hello World', function () {
  const story =
    <button onClick={action('Hello World')}>
      Hello World
    </button>;

  specs(() => describe('Hello World', function () {
    it('Should have the Hello World label', function () {
      let output = mount(story);
      expect(output.text()).toContain('Hello World');
    });
  }));

  return story;
});
```

> Note : if you use enzyme, you will need to add the following lines to your webpack.config.js file. You also needs to add the json library to your dev dependencies. 

>```
>externals: {
>    'jsdom': 'window',
>    'cheerio': 'window',
>    'react/lib/ExecutionEnvironment': true,
>    'react/lib/ReactContext': 'window',
>    'react/addons': true,
>  }
>```

## Use your stories with your CI

Writing tests directly next to the component declaration used for the story is already a great thing, but it would be better if those tests can be reused with our CI.

To do that, the idea is to add to the test runner, all the files used for declaring stories.
But because this addon redefine describe and it functions, you'll need some extra-configuration to make the tests pass within the test runner.

This repository has a [directory full of examples](https://github.com/mthuret/storybook-addon-specifications/tree/master/.storybook) where you can find everything that is describe here. 

### Using JEST

You can use the mocking functionality of jest to switch between the real describe and it implementation of jest or
the one for this addon.

Inside .storybook, add a facade.js file with the following content :

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
  api.add = (name, func)=> {
    func();
    return api;
  };
  api.addWithInfo = (name, func)=> {
    func();
    return api;
  };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const specs = (spec) => {
  spec();
};

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;
```

Create or add to your jest config file the following line :

```js
jest.mock('./.storybook/facade');
```

> **Inside your stories file you must now use the .storybook/facade.js file for imports**.

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
  api.add = (name, func)=> {
    func();
    return api;
  };
  api.addWithInfo = (name, func)=> {
    func();
    return api;
  };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const specs = (spec) => {
  spec();
};

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
