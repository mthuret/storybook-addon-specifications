import {storiesOf as storiesOfReal,
    action as actionReal,
linkTo as linkToReal} from "@kadira/storybook"
/*import { specs as specsReal, describe as describeReal,
  it as itReal } from '@kadira/storybook-addon-specifications'*/
import { specs as specsReal, describe as describeReal,
  it as itReal } from '../src'

export const storiesOf = storiesOfReal;
export const action = actionReal;
export const linkTo = linkToReal;
export const specs = specsReal;
export const describe = describeReal;
export const it = itReal;