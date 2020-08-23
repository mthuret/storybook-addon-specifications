import React from 'react'
import { addons, types } from '@storybook/addons'

import { ADDON_ID } from './constants'

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel()
  addons.addPanel(ADDON_ID, {
    title: 'Specifications',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active, key }) => (
      <Specifications key={key} active={active} api={api} channel={channel} />
    ),
  })
})
