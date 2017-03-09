import addons from '@kadira/storybook-addons';
import {
  EVENT_ID
} from './';
import React from 'react';

let currentStory = "";
const results = {};
const beforeEachFunc = {};
const afterFunc = {};
const afterEachFunc = {};

export function specs(specs) {
  let storyName = specs();
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, {
    results: results[storyName]
  });
}

export function jest(story, context) {
  fetch(`jest?kind=${context.kind}`).then(response => response.json()).then(data => {
    const story = data.stories ? data.stories.filter(story => story.name === context.story) : [];
    if (story[0]) {
      results[context.story] = story[0].specs.reduce((acc, spec) => {
        spec.failure[0] ? acc.wrongResults.push({
              spec: spec.name,
              message: separateMessageFromStack(spec.failure[0]).message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
            }) :
              acc.goodResults.push(spec.name);
        return acc;
      }, {
        goodResults: [],
        wrongResults: []
      })
      const channel = addons.getChannel();
      channel.emit(EVENT_ID, {
        results: results[context.story]
      });
    }

  }).catch((error) => {
      console.error(error);
  });
  return <span>{story()}</span>
}

export function metadata(file) {
  return (story, context) => {
    console.log(file, story, context);
    return story();
  }
}

function separateMessageFromStack(content) {
  if (!content) {
    return {message: '', stack: ''};
  }

  const messageMatch = content.match(/(^(.|\n)*?(?=\n\s*at\s.*\:\d*\:\d*))/);
  let message = messageMatch ? messageMatch[0] : 'Error';
  const stack = messageMatch ? content.slice(message.length) : content;
  // If the error is a plain error instead of a SyntaxError or TypeError
  // we remove it from the message because it is generally not useful.
  if (message.startsWith('Error: ')) {
    message = message.substr('Error: '.length);
  }
  return {message, stack};
};

export const describe = (storyName, func) => {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };

  func();

  if (afterFunc[currentStory]) afterFunc[currentStory]();

  return storyName;
};

export const it = function (desc, func) {
  if (beforeEachFunc[currentStory]) beforeEachFunc[currentStory]();
  try {
    func();
    results[currentStory].goodResults.push(desc);
  } catch (e) {
    console.error(`${currentStory} - ${desc} : ${e}`);
    results[currentStory].wrongResults.push({
      spec: desc,
      message: e.message
    });
  }
  if (afterEachFunc[currentStory]) afterEachFunc[currentStory]();
};

export const before = function (func) {
  func()
};

export const beforeEach = function (func) {
  beforeEachFunc[currentStory] = func;
};

export const after = function (func) {
  afterFunc[currentStory] = func;
};

export const afterEach = function (func) {
  afterEachFunc[currentStory] = func;
};

export const fit = function (desc, func) {
  it(desc, func)
};

export const xit = function (desc, func) {

};

export const xdescribe = function (storyName, func) {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };
  return storyName;
};

describe.skip = function (storyName, func) {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };
  return storyName;
};

it.only = function (desc, func) {
  it(desc, func);
};

it.skip = function (desc, func) {

};

describe.only = function (storyName, func) {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };

  func();

  if (afterFunc[currentStory]) afterFunc[currentStory]();

  return storyName;
};
