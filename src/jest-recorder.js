const ipc = require('node-ipc');

let buffer = [];
let enabled = false;

const server = 'storybook-specifications-middleware';

const process = (results) => {
  buffer = buffer.concat([results]);

  if (enabled && buffer.length) {
    buffer.map(result => {
      ipc.of[server].emit('testResults', result);
    });
    buffer = [];
  }

  return results;
};

const enable = () => {
  enabled = true;
  ipc.of[server].emit('status', "Connected");
}
const disable = () => {
  enabled = true;
  ipc.of[server].emit('status', "Disconnected");
}

ipc.config.id = 'jest-recorder';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.connectTo(server, () => {
  ipc.of[server].on('connect', enable);
  ipc.of[server].on('disconnect', disable);
});

module.exports = process;
