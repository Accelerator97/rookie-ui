import React from 'react'
import './importAll.js' //引入全部Icon图标
import classNames from 'classnames'

export type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' |'light' |'dark'
export interface Iconprops extends React.SVGAttributes<SVGElement> {
    name: string,
    theme?:themeProps
    loading?:boolean
}

export const Icon: React.FunctionComponent<Iconprops> = ({ className, theme,name,loading ,...restProps }) => {
    const classes = classNames('rookie-icon',className,{
        [`icon-${theme}`]:theme,
        'is-loading':loading
    })
    return (
        <svg {...restProps} className={classes}>
            <use xlinkHref={`#${name}`}></use>
        </svg>
    )
}

export default Icon;