import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Input from '../lib/components/Input/input'
import './styles/index.scss'


const root = document.querySelector('#root')
ReactDOM.render(
  <div>
    <Input  size="sm" append='你好'/>
  </div>, root)
