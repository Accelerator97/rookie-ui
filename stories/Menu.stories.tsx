import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from '../lib/components/Menu/menu'
import MenuItem from '../lib/components/Menu/menuItem'
import SubMenu from '../lib/components/Menu/subMenu'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="drop">
      <MenuItem>
        drop1
      </MenuItem>
    </SubMenu>
  </Menu>
)

export const VerticalMenu = () => (
  <Menu defaultIndex='0' mode={'vertical'} onSelect={(index) => { action(`clicked ${index} item`) }} >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="drop">
      <MenuItem>
        drop1
      </MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('垂直Menu',VerticalMenu)