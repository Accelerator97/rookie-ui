import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu from '../lib/components/Menu/menu'
import MenuItem from '../lib/components/Menu/menuItem'
import SubMenu from '../lib/components/Menu/subMenu'

const defaultMenu = () => (
  <Menu defaultIndex='0' >
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

const VerticalMenu = () => (
  <Menu defaultIndex='0' mode={'vertical'} >
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

