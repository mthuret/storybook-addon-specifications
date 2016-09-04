// addons, panels and events get unique names using a prefix
export const ADDON_ID = 'storybook-addon-specifications';
export const PANEL_ID = `${ADDON_ID}/specifications-panel`;
export const EVENT_ID = `${ADDON_ID}/specifications-event`;

export { register } from './manager';
export { specs, describe, it,
  beforeEach, afterEach, after, before,
xit, fit, xdescribe} from './preview';
