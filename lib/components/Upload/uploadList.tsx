import React, { FC,useState } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

interface UploadListProps {
    fileList: UploadFile[]
    onRemove: (_file: UploadFile) => void
}

export const UploadList: FC<UploadListProps> = props => {
    const { fileList, onRemove } = props
    return (
        <ul className="rookie-upload-list">
            {fileList.map(item => {
                return (
                    <li className='rookie-upload-list-item' key={item.uid}>
                        <span className={`file-name file-name-${item.status}}`}>
                            <Icon name="file" theme="secondary"/>
                            {item.name}
                        </span>
                        <span className="file-status">
                            {(item.status === 'uploading' || item.status === 'ready') && <Icon name="loading" loading theme="primary" />}
                            {item.status === 'success' && <Icon name="right" theme="success" />}
                            {item.status === 'error' && <Icon name="false" theme="danger" />}
                        </span> 
                        <span className="file-actions">
                            <Icon name="cancel" onClick={()=>onRemove(item)}></Icon>
                        </span>
                        {(item.status === "uploading" || item.status === "ready") && <Progress percent={item.percentage || 0} />}
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadList;