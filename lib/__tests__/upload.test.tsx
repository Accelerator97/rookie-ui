import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import Upload, { UploadProps } from '../components/Upload/upload'
import { render, RenderResult, fireEvent, createEvent, queryByAltText } from '@testing-library/react'
import { wait } from '@testing-library/dom'

//把icon模拟成span标签包裹着name
jest.mock('../components/Icon/icon', () => (props: any) => <span onClick={props.onClick}>{props.name}</span>);


const testProps: UploadProps = {
    action: 'fakeurl.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove:jest.fn()
}
jest.mock('axios') //用jest接管axios
const mockedAxios = axios as jest.Mocked<typeof axios>

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' }) //要上传的测试文件

describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>点击上传</Upload>)
        fileInput = wrapper.container.querySelector('.rookie-file-input') as HTMLInputElement
        uploadArea = wrapper.container.querySelector('.rookie-upload-component') as HTMLElement
    })
    it('upload process should works fine', async () => {
        mockedAxios.post.mockImplementation(() => {
            return Promise.resolve({ 'data': 'cool' })
        })
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, { target: { files: [testFile] } })//触发文件上传
        expect(wrapper.queryByText('loading')).toBeInTheDocument() //把icon组件转为<span>{name}</span>
        await wait(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
        expect(wrapper.queryByText('right')).toBeInTheDocument()
        expect(testProps.onChange).toHaveBeenCalledWith(testFile)
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool',testFile)
        
        //remove files
        expect(wrapper.queryByText('cancel')).toBeInTheDocument()
        fireEvent.click(wrapper.queryByText('cancel') as HTMLElement)
        expect(wrapper.queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
          }))
    })
    
})