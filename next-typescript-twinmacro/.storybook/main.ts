import type { StorybookConfig } from '@storybook/nextjs';

const path = require('path');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,

        '@': path.resolve(__dirname, '../src'),
      };
    }

    return config;
  },
  babel: async (config) => ({
    ...config,
    presets: [['next/babel']],
    plugins: [
      'babel-plugin-macros',
      [
        '@emotion/babel-plugin-jsx-pragmatic',
        {
          export: 'jsx',
          import: '__cssprop',
          module: '@emotion/react',
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: '__cssprop',
        },
        'emotion-css-prop',
      ],
    ],
  }),
};

export default config;
