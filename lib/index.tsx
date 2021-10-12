import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Button,{ButtonType,ButtonSize} from './components/Button/button'
import './styles/index.scss'


const root = document.querySelector('#root')
ReactDOM.render(
    <div>
      <Button disabled>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>hello</Button>
    </div>, root)
