import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { config } from 'react-transition-group'
import '@testing-library/jest-dom/extend-expect';
import Search, { SearchProps } from '../components/Search/search'
import { wait } from '@testing-library/dom';

config.disabled = true//所有动画设置为同步

const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]

const testProps: SearchProps = {
    fetchSuggestion: (query: string) => { return testArray.filter(item => item.value.includes(query)) },
    onSelect: jest.fn(),
    placeholder: 'auto-search'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render(<Search {...testProps} />)
        inputNode = wrapper.getByPlaceholderText('auto-search') as HTMLInputElement
    })
    it('test basic AutoComplete behavior', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        //因为函数防抖存在产生异步任务
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        // should have two suggestion items
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
        //click the first item
        fireEvent.click(wrapper.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
        //fill the input
        expect(inputNode.value).toBe('ab')
    })
    it('should provide keyboard support', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        const firstResult = wrapper.queryByText('ab')
        const secondResult = wrapper.queryByText('abc')
        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(firstResult).toHaveClass('item-highlighted')
        //arrow down 
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(secondResult).toHaveClass('item-highlighted')
        //arrow up
        fireEvent.keyDown(inputNode, { keyCode: 38 })
        expect(firstResult).toHaveClass('item-highlighted')
        // press enter
        fireEvent.keyDown(inputNode, { keyCode: 13 })
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('click outside should hide the dropdown', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        fireEvent.click(document) //点击组件外的内容
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    it('renderOption should generate the right template', () => {

    })
    it('async fetchSuggestions should works fine', () => {

    })


})

