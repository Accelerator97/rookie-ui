import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Icon from './components/icon/icon'


const root = document.querySelector('#root')
ReactDOM.render(
    <div>
        <Icon name="Alipay" 
        className='hi'
        onClick={()=>console.log('click')} 
        onMouseEnter={()=>console.log('enter')} />
    </div>, root)
