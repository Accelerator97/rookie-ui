import * as React from 'react'
import './importAll.js'
import classNames from 'classnames'


interface Iconprops extends React.SVGAttributes<SVGElement> {
    name: string,
}

const Icon: React.FunctionComponent<Iconprops> = ({ className, name, ...restProps }) => {
    const classes = classNames('rookie-icon',className)
    return (
        <svg {...restProps} className={classes}>
            <use xlinkHref={`#${name}`}></use>
        </svg>
    )
}

export default Icon