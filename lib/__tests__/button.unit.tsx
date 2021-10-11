import * as rendrer from 'react-test-renderer'
import * as React from 'react'
import Button from '..//button'
describe('button',()=>{
    it('是个Div',()=>{
        const tree = rendrer.create(<Button></Button>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})