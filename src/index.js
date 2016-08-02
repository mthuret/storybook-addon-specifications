// addons, panels and events get unique names using a prefix
export const ADDON_ID = 'kadirahq/storybook-addon-hello';
export const PANEL_ID = `${ADDON_ID}/hello-panel`;
export const EVENT_ID = `${ADDON_ID}/hello-event`;

export { register } from './manager';
export { sayHello } from './preview';
