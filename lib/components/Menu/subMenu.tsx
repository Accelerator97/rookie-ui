import React,{useContext,FunctionComponentElement } from 'react'
import classNames from 'classnames'
import {MenuContext} from './menu'
import { MenuItemProps } from './menuItem'
export interface SubMenuProps {
    index?:number;
    title:string;
    className?:string
}

const SubMenu:React.FC<SubMenuProps> = ({index,title,children,className}) => {
    const context = useContext(MenuContext)
    const classes = classNames('menu-item submenu-item',className,{
        'is-active' :context.index === index
    })
    const renderChildren = () =>{
        const childrenComponent = React.Children.map(children,(child,i)=>{
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu'){
                return childElement
            }else{
                console.error('Warning:Menu has a child which is not a MenuItem component') 
                return 
            }
        })
        return (
            <ul className='rookie-submenu'>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes}>
            <div className='submenu-title'>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu