const middlewares = (router) => {
  const {middleware} = require('../dist/middleware');
  middleware(router);
}
module.exports = middlewares;