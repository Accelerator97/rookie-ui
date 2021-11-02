import '../lib/styles/index.scss'
import { create } from "@storybook/theming";
import { addParameters, configure } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
		PreviewSource: "open"
	},
	options: {
		theme: create({
			brandTitle: "rookie-UI",
			brandUrl: "https://github.com/Accelerator97/rookie-ui"
		})
	},
	dependencies: {
		withStoriesOnly: true,
		hideEmpty: true
	}
});

function loadStories() {
    /*根据特定的文件名加载stories，在这个例子，用xxx.stories.tsx命名文件*/
    const req = require.context('../stories', true, /\.stories\.(mdx|tsx)$/);
    req.keys().forEach(filename => req(filename));
  }
  
configure(loadStories, module);