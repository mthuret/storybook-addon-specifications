const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;

const ipc = require('node-ipc');
const { isEmpty } = require('lodash');

ipc.config.id = 'a-unique-process-name1';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => ipc.server.on('a-unique-message-name', message => {
  console.log('🦆 ', message);
}));
ipc.server.start();

if (true) { // TODO detect jest is already running?
  const child = fork(path.join(__dirname, 'jest-runner'), [], {
    detached: true,
    stdio: [ 'ignore', 'ignore', 'ignore', 'ipc' ]
  });
}

// export function middleware(router) {
//     router.get('/jest', (req, res) => {
//         jest.runCLI({_: [req.query.kind]}, getPackageRoot(), (result) => {
//             res.send(parseResults(req, result.testResults));
//             res.end();
//         });
//     });
//     return router;
// };
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
