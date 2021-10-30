import { configure } from '@storybook/react';
import '../lib/styles/index.scss'

function loadStories() {
  /*根据特定的文件名加载stories，在这个例子，用xxx.stories.tsx命名文件*/
  const req = require.context('../stories', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
