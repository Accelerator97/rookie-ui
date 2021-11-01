import React from 'react'
import { render, fireEvent, RenderResult, cleanup, } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Menu, { MenuProps } from '../components/Menu/menu'
import MenuItem from '../components/Menu/menuItem'
import SubMenu from '../components/Menu/subMenu';
import { wait } from '@testing-library/dom';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const createStyleFile = () => {
    const cssFile: string = `
      .rookie-submenu{
          display:none;
      }
      .rookie-submenu.menu-opened{
        display:block;
    }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('rookie-menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3) //不管层级，深度比较 
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5) //只选择第一层的li
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when hover on SubMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})
describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
        expect(wrapper2.queryByText('drop1')).not.toBeInTheDocument()
        fireEvent.click(wrapper2.getByText('dropdown'))
        expect(wrapper2.queryByText('drop1')).toBeVisible()
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})