export const storiesOf = function storiesOf() {
  var api = {};
  api.add = (name, func)=> {
    func();
    return api;
  };
  api.addWithInfo = (name, func)=> {
    func();
    return api;
  };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const specs = (spec) => {
  spec();
};

export const describe = describe;
export const it = it;
export const after = after;
export const before = before;
export const afterEach = afterEach;
export const beforeEach = beforeEach;