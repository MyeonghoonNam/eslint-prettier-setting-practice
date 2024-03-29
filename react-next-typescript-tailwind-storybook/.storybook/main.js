const path = require('path');

module.exports = {
	stories: [
		'../stories/**/*.stories.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-css-modules-preset',
		{
			name: '@storybook/addon-styling',
			options: {
				postCss: true,
			},
		},
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async (config) => {
		config.resolve.alias = {
			...config.resolve.alias,

			'@pages': path.resolve(__dirname, '../pages'),
			'@styles': path.resolve(__dirname, '../styles'),
		};

		return config;
	},
};
