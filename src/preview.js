import addons from '@kadira/storybook-addons';
import { EVENT_ID } from './';

const results = {
  goodResults: [],
  wrongResults: []
};

export function specs(specs) {
    specs();
    // get `channel` from the addon API
    const channel = addons.getChannel();
    // send the message using the channel
    channel.emit(EVENT_ID, {results});
}

export const describe = (desc, func) => {
  results.goodResults = [];
  results.wrongResults = [];
  return func;
};

export const it = function (desc, func) {
  try {
    func();
    results.goodResults.push(desc);
  } catch (e) {
    results.wrongResults.push({spec: desc, message: e.message});
  }
};

