import addons, { makeDecorator } from '@storybook/addons'
import { PARAMETER_ID } from './constants'

export * from './register'
export * from './preview'

export const withSpec = makeDecorator({
  name: 'withSpec',
  parameterName: PARAMETER_ID,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel()
    channel.emit(Events.UpdateConfig, parameters)

    return getStory(context)
  },
})

if (module && module.hot && module.hot.decline) {
  module.hot.decline()
}
