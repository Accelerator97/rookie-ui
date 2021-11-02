import React, { FC, useRef, ChangeEvent, useState } from 'react'
import Button from '../Button/button'
import axios from 'axios'
import  UploadList  from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string,
    size: number,
    name: string,
    status?: UploadFileStatus,
    percentage?: number,
    raw?: File,
    response?: any,
    error?: any
}
export interface UploadProps {
    /**文件上传的接口 */
    action: string,
    defaultFileList?:UploadFile[]
    beforeUpload?: (file: File) => boolean | Promise<File>,
    onProgress?: (percentage: number, file: File) => void,
    onSuccess?: (data: any, file: File) => void,
    onError?: (err: any, file: File) => void,
    onChange?: (file: File) => void
    onRemove?:(file:UploadFile) => void
}

export const Upload: FC<UploadProps> = (props) => {
    const { action, defaultFileList,beforeUpload, onProgress, onSuccess, onError, onChange ,onRemove} = props
    const fileInput = useRef<HTMLInputElement>(null)//获取input节点
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files //获取input节点中的files
        if (!files) { return }
        upLoadFiles(files)  //调用上传文件的方法
        if (fileInput.current) { //清空input节点内容
            fileInput.current.value = ''
        }
    }
    const upLoadFiles = (files: FileList) => {
        let postFiles = Array.from(files) //把files转为数组
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {  //如果beforeUpload函数存在
                const result = beforeUpload(file)
                if (result && result instanceof Promise) { //result是一个Promise对象，拿到处理后的文件上传
                    result.then(processFiles => post(processFiles))
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    //处理上传文件的函数
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percentage: 0,
            raw: file
        }
        setFileList([_file, ...fileList]) //当前的状态放在数组最前面
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            },
            onUploadProgress: (e) => { //axios里面提供显示上传进度的api：onUploadProgress
                let percentage = Math.round(e.loaded * 100 / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file,{percentage:percentage,status:'uploading'})
                    if (onProgress) { //上传未完成调用onProgress函数
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(res => {
            console.log(res)
            updateFileList(_file,{status:'success',response:res.data})
            if (onSuccess) {
                //服务器返回的res有很多属性，data才是我们要求的JSON数据
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(error => {
            console.log(error)
            updateFileList(_file,{status:'error',error:error})
            if (onError) {
                onError(error, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    const handleRemove = (file:UploadFile)=>{
        setFileList((previousList)=>{
            return previousList.filter(item => item.uid !== file.uid)
        })
        if(onRemove){
            onRemove(file)
        }
    }
    return (
        <div className="rookie-upload-component">
            <Button btnType="primary" onClick={handleClick}>上传文件</Button>
            <input
                className="rookie-file-input"
                style={{ display: 'none' }}
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
            />
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

export default Upload;