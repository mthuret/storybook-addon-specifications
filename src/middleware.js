const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;

const { isEmpty, merge } = require('lodash');

const data = (() => {
  let state = {};
  let states = []

  return {
    set: (data) => {
      state = merge({}, state, data);
      states = states.concat([state]);
      // console.log(state);
      console.log('💾', 'new state stored');
      return state;
    },
    getLast: () => {
      return state;
    },
    getHistory: () => {
      return states;
    }
  };
})();

const connect = () => {
  const ipc = new Promise((resolve) => {
    const ipc = require('node-ipc');
    ipc.config.id = 'storybook-specifications-middleware';
    ipc.config.retry = 1500;
    ipc.config.silent = true;
    ipc.serve(() => {
      console.log('🌱', 'started ipc server');
      resolve(ipc);
    });
    ipc.server.start();

    ipc.server.on('message', (data, socket) => {
      console.log('🥁', 'message', data);
      // ipc.server.emit(socket, 'message', data); // WORKS
    });
    ipc.server.on('custom', (data, socket) => {
      console.log('💅🏻', 'custom', data);
      // ipc.server.emit(socket, 'message', data); // WORKS
    });
    ipc.server.on('connect', (socket) => {
      console.log('💡', 'connect');
    });
    ipc.server.on('error', (data, socket) => {
      console.log('🚨', 'error', data);
      // ipc.server.emit(socket, 'error', error);
    });
  });

  const websocket = new Promise((resolve) => {
    const websocket = require('ws');

    const server = new websocket.Server({
      perMessageDeflate: false,
      port: 9002
    });

    const broadcast = (payload) => server.clients.forEach((client) => {
      if (client.readyState === websocket.OPEN) {
        client.send(payload);
      }
    });

    Object.assign(websocket, {
      server: Object.assign(server, { broadcast }),
    });

    console.log('⛳️', 'started websocket server');
    resolve(websocket);
  });

  Promise.all([ipc, websocket]).then(([ipc, websocket]) => {
    console.log('🌈', 'ipc & websocket connected');

    ipc.server.broadcast('message', 'Moooo!');
    websocket.server.broadcast('Moooo!');

    ipc.server.on('testResults', (results) => {
      data.set(results);
      console.log('🏓', `broadcast testresults`);
      websocket.server.broadcast(JSON.stringify(data.getLast()));
    });

    websocket.server.on('message', (message) => {
      console.log('🐬', `received: ${message}`);
    });

    websocket.server.on('connection', (client) => {
      console.log('🐤', `new connection`);
      client.send(JSON.stringify(data.getLast()));
    });
  });

  if (true) { // TODO detect jest is already running?
    const child = fork(path.join(__dirname, 'jest-runner'), [], {
      detached: true,
      silent: true,
      stdio: [ 'ignore', 'ignore', 'ignore', 'ipc' ]
    });
  }
}

export function middleware(router) {
  router.get('/test', function (req, res) {
    res.json({
      results: data.getLast(),
      websocket: 'ws://localhost:9002'
    });
  });
  connect();
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
