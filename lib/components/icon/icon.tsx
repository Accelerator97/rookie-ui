import * as React from 'react'
import './importAll.js'
import './icon.scss'
import classes from  '../../helpers/classnames'

interface Iconprops extends React.SVGAttributes<SVGElement> {
    name: string,
}

const Icon: React.FunctionComponent<Iconprops> = ({className, name,...restProps}) => {
    return (
        <svg className={classes('rookie-icon',className)}
            {...restProps}>
            <use xlinkHref={`#${name}`}></use>
        </svg>
    )
}

export default Icon