const ipc = require('node-ipc');

let buffer = [];
let process = () => {
  // console.log('buffer', buffer);
};

ipc.config.id = 'a-unique-process-name2';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.connectTo('a-unique-process-name1', () => {
  ipc.of['a-unique-process-name1'].on('connect', () => {
    ipc.of['a-unique-process-name1'].emit('a-unique-message-name', "Connected");
    process = () => {
      // console.log('processing', buffer);
      buffer.map(result => {
        ipc.of['a-unique-process-name1'].emit('a-unique-message-name', result);
      });
      buffer = [];
    };
    process();
  });
});

module.exports = (results) => {
  // ipc.log(results);
  buffer = buffer.concat([results]);
  // ipc.log(buffer);
  process();
  return results;
}
