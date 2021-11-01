import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Input, { InputProps } from '../components/Input/input'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('test input component', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps} />)
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('rookie-input-inner')
        fireEvent.change(testNode, { target: { value: '23' } }) //改变input的内容
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('23')
    })
    it('it should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder="disabled" />)
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    })
    it('should render different input sizes on size property', () => {
        const wrapper = render(<Input placeholder="sizes" size="lg" />)
        const testContainer = wrapper.container.querySelector('.rookie-input-wrapper')
        expect(testContainer).toHaveClass('input-size-lg')
    })
    it('should render prepand and append element on prepand/append property', () => {
        const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
        const testContainer = container.querySelector('.rookie-input-wrapper')
        expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
        expect(queryByText('https://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
      })
})