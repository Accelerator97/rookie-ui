import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Button from '../lib/components/Button/button'

const defaultButton = ()=> (
    <Button onClick={action('clicked')}>default Button</Button>
)

const buttonWithSize = ()=>(
    <div>
    <Button size="lg">large Button</Button>
    <Button size="sm">small Button</Button>
    </div>
)
const buttonWithType = ()=>(
    <div>
    <Button btnType="primary">primary Button</Button>
    <Button btnType="danger">danger Button</Button>
    <Button btnType="link" href="https://www.baidu.com">link Button</Button>
    </div>
)

storiesOf('Button Component',module)
  .add('Button',defaultButton)
  .add('不同大小的Button',buttonWithSize)
  .add('不同类型的Button',buttonWithType)