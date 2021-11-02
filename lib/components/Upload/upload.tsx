import classNames from 'classnames'
import React,{FC,useRef,ChangeEvent} from 'react'
import Button from '../Button/button'
import axios from 'axios'

export interface UploadProps {
    /**文件上传的接口 */
    action:string,
    onProgress?:(percentage:number,file:File) => void,
    onSuccess?:(data:any,file:File) => void
    onError?:(err:any,file:File) => void
}

export const Upload:FC<UploadProps> = (props)=>{
    const {action,onProgress,onSuccess,onError} = props
    const fileInput = useRef<HTMLInputElement>(null)//获取input节点
    const handleClick = () =>{
        if(fileInput.current){
            fileInput.current.click()
        }
    }
    const handleFileChange =(e:ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files //获取input节点中的files
        if(!files) {return}
        upLoadFiles(files)  //调用上传文件的方法
        if(fileInput.current){ //清空input节点内容
            fileInput.current.value = ''
        }
    }
    const upLoadFiles = (files:FileList) =>{
        let postFiles = Array.from(files) //把files转为数组
        postFiles.forEach(file =>{
            const formData = new FormData()
            formData.append(file.name,file)
            axios.post(action,formData,{
                headers:{
                    'Content-type':'multipart/form-data'
                },
                onUploadProgress:(e)=>{ //axios里面提供显示上传进度的api
                    let percentage = Math.round(e.loaded * 100 /e.total) || 0 
                    if(percentage < 100){
                        if(onProgress){ //上传未完成调用onProgress函数
                            onProgress(percentage,file)
                        }
                    }
                }
            }).then(res =>{
                console.log(res)
                if(onSuccess){
                    //服务器返回的res有很多属性，data才是我们要求的JSON数据
                    onSuccess(res.data,file)
                }
            }).catch(error =>{
                console.log(error)
                if(onError){
                    onError(error,file)
                }
            })
        })
    }
    return (
        <div className="rookie-upload-component">
            <Button btnType="primary" onClick={handleClick}>上传文件</Button>
            <input
               className="rookie-file-input"
               style={{display:'none'}}
               type="file" 
               ref={fileInput}
               onChange={handleFileChange}
            />
        </div>
    )
}

export default Upload;