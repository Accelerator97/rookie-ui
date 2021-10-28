import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import './styles/index.scss'


const root = document.querySelector('#root')
ReactDOM.render(
    <div>
      <Menu defaultIndex={0} onSelect={(index=>alert(index))} mode={'vertical'}>
        <MenuItem index={0}>hi</MenuItem>
        <MenuItem index={1} disabled>hi</MenuItem>
        <MenuItem index={2}>hi</MenuItem>
        <MenuItem index={3}>hi</MenuItem>
      </Menu>
    </div>, root)
