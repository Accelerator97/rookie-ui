import * as React from 'react'
import './importAll.js'

interface Iconprops {
    name:string
}

const Icon:React.FunctionComponent<Iconprops> = (props)=>{
    return(
        <span>
            <svg>
                <use xlinkHref={`#${props.name}`}></use>
            </svg>
        </span>
    )
}

export default Icon