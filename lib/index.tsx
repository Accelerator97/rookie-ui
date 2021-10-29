import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import './styles/index.scss'


const root = document.querySelector('#root')
ReactDOM.render(
  <div>
    <Menu onSelect={(index => alert(index))}>
      <MenuItem>hi</MenuItem>
      <MenuItem disabled>hi</MenuItem>
      <MenuItem>hi</MenuItem>
      <MenuItem>hi</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown1</MenuItem>
        <MenuItem>dropdown2</MenuItem>
        <MenuItem>dropdown3</MenuItem>
      </SubMenu>
    </Menu>
  </div>, root)
