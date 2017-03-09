const ipc = require('node-ipc');

let buffer = [];
let enabled = false;

const server = 'storybook-specifications-middleware';

const process = (results) => {
  buffer = buffer.concat([results]);

  ipc.of[server].emit('message', "process");
  if (enabled && buffer.length) {
    buffer.map(result => {
      ipc.of[server].emit('message', "process > result");
      ipc.of[server].emit('testResults', result);
    });
    buffer = [];
  }

  return results;
};

const enable = () => {
  enabled = true;
  ipc.log('status', "Connected");
  ipc.of[server].emit('message', "Connected");
  process();
}
const disable = () => {
  enabled = false;
  ipc.config.stopRetrying = true;
  ipc.disconnect(server);
}

ipc.config.id = 'jest-recorder';
ipc.config.retry = 50;
ipc.config.silent = true;
ipc.config.maxRetries = 10;
ipc.connectTo(server, () => {
  ipc.of[server].on('connect', enable);
  ipc.of[server].on('disconnect', disable);
  ipc.of[server].on('message', () => console.log('IPC MESSAGE'));
  ipc.of[server].on('error', (err) => console.log('IPC ERROR'));
});

module.exports = process;
