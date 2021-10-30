import React from 'react'
import './importAll.js' //引入全部Icon图标
import classNames from 'classnames'

export type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' |'light' |'dark'
interface Iconprops extends React.SVGAttributes<SVGElement> {
    name: string,
    theme?:themeProps
}

const Icon: React.FunctionComponent<Iconprops> = ({ className, theme,name, ...restProps }) => {
    const classes = classNames('rookie-icon',className,{
        [`icon-${theme}`]:theme
    })
    return (
        <svg {...restProps} className={classes}>
            <use xlinkHref={`#${name}`}></use>
        </svg>
    )
}

export default Icon