export const storiesOf = function storiesOf() {
  var api = {};
  api.add = ()=> { return api; };
  api.addWithInfo = ()=> { return api; };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const specs = () => {};

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;

