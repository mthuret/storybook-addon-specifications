import addons, { StoryGetter, StoryContext, WrapperSettings } from '@storybook/addons'
import { StoryTestResults } from './types'

export const storyWrapper = (
  getStory: StoryGetter,
  context: StoryContext,
  settings: WrapperSettings,
) => {
  const { parameters } = settings
  const channel = addons.getChannel()

  return getStory(context)
}
