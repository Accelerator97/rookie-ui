import React from "react";
import Upload ,{UploadFile}from '../lib/components/Upload/upload'



const UploadExample = () =>{
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percentage: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percentage: 100 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percentage: 30 }
  ]
  
    return (
      <Upload action="https://getman.cn/echo" defaultFileList={defaultFileList}></Upload>
    )
}

export {UploadExample}