import React from 'react';
import addons from '@kadira/storybook-addons';
import Specifications from './containers/Specifications'
import { ADDON_ID, PANEL_ID } from './';

// register function will call addons.register to register an addon loader
// This is executed when importing `@kadira/storybook-addon-hello/register`
export function register() {
  // addons.register can be used to register a new addon loader function.
  // Addon loader will receive `api` as an argument which can be used to
  // interact with the storybook manager. We're not using it in this addon.
  addons.register(ADDON_ID, api => {
    // get `channel` from the addon API
    const channel = addons.getChannel();
    // addons.addPanel can be used to add a new panel to storybook manager
    // The `title` field will be used as the tab title and the `render` field
    // will be executed to render the tab content.
    addons.addPanel(PANEL_ID, {
      title: 'Specifications',
      render: () => <Specifications api={api} channel={channel} />
    });
  });
}
