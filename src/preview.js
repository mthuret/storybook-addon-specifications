import addons from '@kadira/storybook-addons';
import { EVENT_ID } from './';

let currentStory = "";
const results = {};
const beforeEachFunc = {};
const afterFunc = {};
const afterEachFunc = {};

export function specs(specs) {
  let storyName = specs();
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, {results : results[storyName]});
}

export const describe = (storyName, func) => {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };

  func();

  if(afterFunc[currentStory]) afterFunc[currentStory]();

  return storyName;
};

export const it = function (desc, func) {
  if(beforeEachFunc[currentStory]) beforeEachFunc[currentStory]();
  try {
    func();
    results[currentStory].goodResults.push(desc);
  } catch (e) {
    console.error(`${currentStory} - ${desc} : ${e}`);
    results[currentStory].wrongResults.push({spec: desc, message: e.message});
  }
  if(afterEachFunc[currentStory]) afterEachFunc[currentStory]();
};

export const before = function(func) {
  func()
};

export const beforeEach = function(func) {
  beforeEachFunc[currentStory] =  func;
};

export const after = function(func) {
  afterFunc[currentStory] =  func;
};

export const afterEach = function(func) {
  afterEachFunc[currentStory] =  func;
};

export const fit = function (desc, func) {
  it(desc, func)
};

export const xit = function (desc, func) {

};

export const xdescribe = function (storyName, func){
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };
  return storyName;
};

describe.skip = function (storyName, func){
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

  if(afterFunc[currentStory]) afterFunc[currentStory]();

  return storyName;
};