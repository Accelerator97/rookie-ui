import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
// import Upload,{ UploadFile } from './components/Upload/upload'
import Progress from '../lib/components/Progress/progress'

// const defaultFileList: UploadFile[] = [
//   { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percentage: 30 },
//   { uid: '122', size: 1234, name: 'xyz.md', status: 'uploading', percentage: 100 },
//   { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percentage: 30 }
// ]
const root = document.querySelector('#root')
// const checkFileSize =(file:File) =>{
//   if(Math.round(file.size/1024) > 50) {
//     alert('file too big')
//     return false
//   }
//   return true
// }
// const filePromise = (file:File) =>{
//   const newFile = new File([file],'new_name.md',{type:file.type})
//   return Promise.resolve(newFile)
// }
ReactDOM.render(
  <div>
    <Progress   percent={100}/>
  </div>, root)
