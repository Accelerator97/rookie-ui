import React, { InputHTMLAttributes, FC, ReactElement } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import { ChangeEvent } from 'react-syntax-highlighter/node_modules/@types/react'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: string
    /**前缀 */
    prepend?: string | ReactElement; 
    /**后缀 */
    append?: string | ReactElement;
    /**受控组件的回调事件，用来取值 */
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Input: FC<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, style, ...restProps } = props
    const classes = classNames('rookie-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
    const fixControlledValue = (value:any) =>{
        if(typeof value === 'undefined' || value ===null){
            return ''
        }
        return value 
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div className={classes} style={style}>
        {prepend && <div className="rookie-input-group-prepend">{prepend}</div>}
        <input 
          className="rookie-input-inner"
          disabled={disabled}
          {...restProps}
        />
        {icon && <Icon name={icon} className="icon-wrapper"/>}
        {append && <div className="rookie-input-group-append">{append}</div>}
      </div>
    )
}

export default Input

