import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import './styles/index.scss'


const root = document.querySelector('#root')
ReactDOM.render(
    <div>
      <Menu defaultIndex={0} onSelect={(index=>alert(index))}>
        <MenuItem index={0}>hi</MenuItem>
        <MenuItem index={1} disabled>hi</MenuItem>
        <MenuItem index={2}>hi</MenuItem>
        <MenuItem index={3}>hi</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </SubMenu>
      </Menu>
    </div>, root)
