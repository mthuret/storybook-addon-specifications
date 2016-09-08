if (!global['storiesOf']) {
  var {
    storiesOf: storiesOfReal,
    action: actionReal,
    linkTo: linkToReal,
  } = require("@kadira/storybook");
}

if (!global['specs']) {
  var {
    specs: specsReal,
  } = require('../dist');
}

export const storiesOf = global['storiesOf'] || storiesOfReal;
export const action = global['action'] || actionReal;
export const linkTo = global['linkTo'] || linkToReal;
export const specs = global['specs'] || specsReal;
