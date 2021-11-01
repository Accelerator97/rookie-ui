import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import './styles/index.scss'


const root = document.querySelector('#root')
ReactDOM.render(
  <div>
   <Menu defaultIndex='0' onSelect={(index) => console.log(index) } >
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
  </div>, root)
