import {storiesOf as storiesOfReal,
    action as actionReal,
linkTo as linkToReal} from "@kadira/storybook"
import { specs as specsReal, describe as describeReal,
  it as itReal, beforeEach as beforeEachReal,
before as beforeReal, after as afterReal,
afterEach as afterEachReal,
xit as xitReal,
fit as fitReal,
xdescribe as xdescribeReal} from '../src'

export const storiesOf = storiesOfReal;
export const action = actionReal;
export const linkTo = linkToReal;
export const specs = specsReal;
export const describe = describeReal;
export const it = itReal;

export const beforeEach = beforeEachReal;
export const afterEach = afterEachReal;
export const before = beforeReal;
export const after = afterReal;

export const xit = xitReal;
export const fit = fitReal;
export const xdescribe = xdescribeReal;
