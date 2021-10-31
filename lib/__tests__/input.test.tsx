import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input,{InputProps} from '../components/Input/input'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('test input component',()=>{
    it('should render the correct default Input',()=>{
        const wrapper = render(<Input {...defaultProps}/>)
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('rookie-input-inner')
        fireEvent.change(testNode, { target: { value: '23' } }) //改变input的内容
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('23')
    })
})