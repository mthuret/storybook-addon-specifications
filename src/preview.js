import addons from '@kadira/storybook-addons';
import { EVENT_ID } from './';

let currentStory = "";
const results = {};

export function specs(specs) {
  let storyName = specs();

  // get `channel` from the addon API
  const channel = addons.getChannel();
  // send the message using the channel
  channel.emit(EVENT_ID, {results : results[storyName]});
}

export const describe = (storyName, func) => {
  currentStory = storyName;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };

  func();
  return storyName;
};

export const it = function (desc, func) {
  try {
    func();
    results[currentStory].goodResults.push(desc);
  } catch (e) {
    console.error(`${currentStory} - ${desc} : ${e}`);
    results[currentStory].wrongResults.push({spec: desc, message: e.message});
  }
};

