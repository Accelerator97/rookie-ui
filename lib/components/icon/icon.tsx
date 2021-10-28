import * as React from 'react'
import './importAll.js'
import './icon.scss'


interface Iconprops extends React.SVGAttributes<SVGElement> {
    name: string,
}

const Icon: React.FunctionComponent<Iconprops> = ({ className, name, ...restProps }) => {
    return (
        <svg {...restProps}>
            <use xlinkHref={`#${name}`}></use>
        </svg>
    )
}

export default Icon