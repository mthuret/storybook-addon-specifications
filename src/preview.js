import addons from '@storybook/addons';
import { EVENT_ID } from './';

let currentStory = "";
const results = {};
const beforeEachFunc = {};
const afterFunc = {};
const afterEachFunc = {};

export function specs(specs) {
  let storyName = specs();
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, { storyName, results: results[storyName] });
}

export const describe = (storyName, func) => {
  currentStory = storyName;
  results[currentStory] = { goodResults: [], wrongResults: [] };
  func();
  if(afterFunc[currentStory]) afterFunc[currentStory]();
  return storyName;
};

export const it = function(desc, func) {
  const storyName = currentStory;

  const pushGoodResult = () => {
    results[storyName].goodResults.push(desc);
  };

  const pushWrongResult = (e) => {
    console.error(`${storyName} - ${desc} : ${e}`);
    results[storyName].wrongResults.push({ spec: desc, message: e.message });
  };

  const emitAsyncResultsUpdate = () => {
    const channel = addons.getChannel();
    channel.emit(EVENT_ID, { asyncResultsUpdate: true, storyName, results: results[storyName] });
  };

  const done = (e) => {
    if (e) pushWrongResult(e);
    else pushGoodResult();
    emitAsyncResultsUpdate();
  };

  if (beforeEachFunc[storyName]) beforeEachFunc[storyName]();

  try {
    if (func.length) func(done);
    else {
      const result = func();
      if (result && typeof result.then === 'function') {
        return result.then(() => done(), (e) => done(e || { message: 'failed' }));
      }
      pushGoodResult();
    }
  } catch (e) {
    pushWrongResult(e);
  }

  if (afterEachFunc[storyName]) afterEachFunc[storyName]();
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
  return describe(storyName, func)
};

export const fdescribe = function (storyName, func) {
  return describe(storyName, func)
};
