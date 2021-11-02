import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import axios from 'axios'
import { Upload } from './components/Upload/upload'


const root = document.querySelector('#root')

ReactDOM.render(
  <div>
    <Upload action="https://jsonplaceholder.typicode.com/posts" />
  </div>, root)
