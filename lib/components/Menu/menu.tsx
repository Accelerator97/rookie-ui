import React, { createContext,FunctionComponentElement,useState } from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex:number) => void
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallback
}

interface IMenuContext {
    index:number;
    onSelect?:SelectCallback,
    mode?:MenuMode
}
export const MenuContext = createContext<IMenuContext>({index:0}) //传给子组件


const Menu:React.FC<MenuProps> = (props) =>{
    const {className,mode,style,children,defaultIndex,onSelect} = props
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('rookie-menu',className,{
        'menu-vertical':mode === 'vertical',
        'menu-horizontal':mode !== 'vertical'
    }) 
    const handleClick = (index:number) =>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }
    const renderChildren = () => {
        return React.Children.map(children,(child,index)=>{
            const childElement = child as FunctionComponentElement<MenuItemProps> //获取函数组件实例
            const {displayName} = childElement.type
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement,{index})
            }else{
                console.error('Warning:Menu has a child which is not a MenuItem component')
                return 
            }
        })
    }
    const passedContext:IMenuContext= {
        index:currentActive? currentActive :0,
        onSelect:handleClick,
        mode:mode
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value = {passedContext}>
            {renderChildren()}
            </MenuContext.Provider> 
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex:0,
    mode:'horizontal'
}

export default Menu