import * as React from 'react'
import {render} from 'testing-library/react'
import Button from './button'

test('our first react test case',()=>{
    const wrapper = render(<Button>hi</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
})

