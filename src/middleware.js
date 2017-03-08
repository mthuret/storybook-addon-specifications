const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;

const ipc = require('node-ipc');
const { isEmpty } = require('lodash');

ipc.config.id = 'storybook-specifications-middleware';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => ipc.server.on('testResults', message => {
  console.log('🦆 ', message);
}));
ipc.server.start();

if (false) { // TODO detect jest is already running?
  const child = fork(path.join(__dirname, 'jest-runner'), [], {
    detached: true,
    stdio: [ 'ignore', 'ignore', 'ignore', 'ipc' ]
  });
}

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: 9002
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send('something');
});

export function middleware(router) {
  router.get('/test', function (req, res) {
    res.send('ws://localhost:9002');
  });
  return router;
};
//
// function parseResults(req,results){
//     const result = results.filter(t => t.testResults[0].ancestorTitles[0] === req.query.kind);
//
//     let jsonResults = {kind: result[0].testResults[0].ancestorTitles[0]};
//
//     jsonResults.stories = result[0].testResults.reduce((acc, result) => {
//     const story = acc.filter(story => story.name === result.ancestorTitles[1]);
//     if(!isEmpty(story)){
//       story[0].specs.push({
//         failure: result.failureMessages,
//           name: result.title,
//           status: result.status,
//       })
//     }else{
//       acc.push({
//         name: result.ancestorTitles[1],
//         specs: [{
//           failure: result.failureMessages,
//           name: result.title,
//           status: result.status,
//         }],
//       })
//     }
//     return acc;
//   }, [])
//   return jsonResults;
// }
