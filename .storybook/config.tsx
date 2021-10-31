import { withInfo } from '@storybook/addon-info';
import { configure ,addDecorator,addParameters} from '@storybook/react';
import React from 'react'
import '../lib/styles/index.scss'
  
const wrapperStyle:React.CSSProperties = {
  padding:'20px 40px',
}

const storyWrapper = (storyFn:any) =>(
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
  info:{
    inline:true,header:false
  }
})

function loadStories() {
  /*根据特定的文件名加载stories，在这个例子，用xxx.stories.tsx命名文件*/
  const req = require.context('../stories', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
