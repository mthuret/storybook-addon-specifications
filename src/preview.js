import addons from '@kadira/storybook-addons';
import { EVENT_ID } from './';

// hello function will return a function which will set the text inside
// the "Hello World" panel. The new text is sent using the channel.
export function sayHello(text) {
  return () => {
    // get `channel` from the addon API
    const channel = addons.getChannel();
    // send the message using the channel
    channel.emit(EVENT_ID, {text});
  };
}
