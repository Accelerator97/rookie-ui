import React, { FC, useRef, ChangeEvent, useState } from 'react'
import Button from '../Button/button'
import axios from 'axios'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string,
    size: number,
    name: string,
    status?: UploadFileStatus,
    percentage: number,
    raw?: File,
    response?: any,
    error?: any
}
export interface UploadProps {
    /**上传按钮显示的文字 */
    text?:string,
    /**文件上传的接口 */
    action: string,
    /**默认展示上传文件及上传进度 */
    defaultFileList?: UploadFile[]
    /** 上传文件前的回调函数，可以用来检测文件大小以及上传文件名修改等*/
    beforeUpload?: (file: File) => boolean | Promise<File>,
    /**文件上传时的回调函数 */
    onProgress?: (percentage: number, file: File) => void,
    /**文件上传成功时的回调函数 */
    onSuccess?: (data: any, file: File) => void,
    /**文件上传失败时的回调函数 */
    onError?: (err: any, file: File) => void,
    /**文件上传状态改变时（上传中/上传成功/上传失败）的回调函数 */
    onChange?: (file: File) => void
    /**移除已上传或上传中的文件的回调函数 */
    onRemove?: (file: UploadFile) => void,
    /**设置请求头 */
    header?: { [key: string]: any },
    /**上传给服务器的文件名 */
    name?: string,
    /**上传数据 */
    data?: { [key: string]: any };
    /**是否携带cookie */
    withCredentials?: boolean,
    /**限制上传文件格式 */
    accept?: string,
    /**支持多文件上传 */
    multiple?: boolean
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        text,
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        header,
        data,
        withCredentials,
        accept,
        multiple
    } = props
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
        setFileList(prevList => {
            return [_file, ...prevList]
        }) //当前的状态放在数组最前面
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...header,
                'Content-type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => { //axios里面提供显示上传进度的api：onUploadProgress
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                updateFileList(_file, { percentage: percentage, status: 'uploading' })
                console.log('uploading?', _file.status)
                if (onProgress) { //上传未完成调用onProgress函数
                    onProgress(percentage, file)
                }
            }
        }).then(res => {
            console.log(res)
            updateFileList(_file, { status: 'success', response: res.data })
            if (onSuccess) {
                //服务器返回的res有很多属性，data才是我们要求的JSON数据
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(error => {
            console.log(error)
            updateFileList(_file, { status: 'error', error: error })
            if (onError) {
                onError(error, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((previousList) => {
            return previousList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    return (
        <div className="rookie-upload-component">
            <Button btnType="primary" onClick={handleClick}>{text}</Button>
            <input
                className="rookie-file-input"
                style={{ display: 'none' }}
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            />
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

Upload.defaultProps = {
    name: 'file',
    text:'上传文件'
}
export default Upload;