import React from "react";
import {
  storiesOf,
  action
} from "@kadira/storybook"
import { metadata } from '../../src'

const stories = storiesOf('HelloWorld', module)
  .addDecorator(metadata({ module, __dirname, __filename }));

const HELLO_WORLD = <button onClick = {action('Hello World')}>Hello World</button>

stories.add('story1', function () {
  return HELLO_WORLD;
});

stories.add('story2', function () {
  return HELLO_WORLD;
});


export {HELLO_WORLD};
