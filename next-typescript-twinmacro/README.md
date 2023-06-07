# Description

Next.js(v13, pages route) + Typescript + ESLint(airbnb) + Prettier + tailwindCSS + Emotion + twin.macro + Storybook init

## Next Setup

```
npx create-next-app@latest

What is your project named?  [app name]
Would you like to add TypeScript with this project?  Y
Would you like to use ESLint with this project?  N
Would you like to use Tailwind CSS with this project? Y
Would you like to use the `src/ directory` with this project? Y
What import alias would you like configured? `@/*`
```

## ESLint + Prettier Setup

### Install

```
npm i -D eslint prettier
npm i -D eslint-config-prettier eslint-plugin-prettier
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npx install-peerdeps --dev eslint-config-airbnb
```

### .eslitrc.json

```
// .eslintrc.json 파일 설정
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react-hooks"],
  "extends": [
    "airbnb",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": true,
        "peerDependencies": true
      }
    ],
    "@typescript-eslint/no-var-requires": "off",
    "no-nested-ternary": "off",
    "consistent-return": "off",
    "react/destructuring-assignment": [0, "always"],
    "no-shadow": "off",
    "default-param-last": 0,
    "no-restricted-syntax": [
      "error",
      "WithStatement",
      "BinaryExpression[operator='in']"
    ],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": ["function-declaration", "arrow-function"],
        "unnamedComponents": "arrow-function"
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "{}": false
        }
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx", ".js", ".jsx"]
      },
      "typescript": {}
    }
  }
}

```

### .prettierrc.json

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true
}

```

## TailwindCSS Setup

npx create-next-app 설정에서 tailwindCSS를 설치하지 않은 경우에 대한 설정

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### src/styles/globals.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## twin.macro Setup

```
npm i @emotion/react @emotion/styled
npm i -S @emotion/serialize
npm i -D twin.macro @emotion/babel-plugin babel-plugin-macros @babel/plugin-syntax-typescript @babel/preset-react
```

### make withTwin.js

```javascript
/* eslint-disable no-param-reassign */
const path = require('path');

const includedDirs = [path.resolve(__dirname, 'src')];

module.exports = function withTwin(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: dev,
              presets: [
                [
                  '@babel/preset-react',
                  { runtime: 'automatic', importSource: '@emotion/react' },
                ],
              ],
              plugins: [
                require.resolve('babel-plugin-macros'),
                require.resolve('@emotion/babel-plugin'),
                [
                  require.resolve('@babel/plugin-syntax-typescript'),
                  { isTSX: true },
                ],
              ],
            },
          },
        ],
      });

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};
```

### make twin.d.ts (src/types)

```typescript
import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import styledImport from '@emotion/styled';
import CSSInterpolation from '@emotion/serialize';

declare module 'twin.macro' {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
```

### tsconfig.json

```javascript
{
  ...

  "types": ["types"] // add
}

```

### next.config.js

```javascript
const withTwin = require('./withTwin');

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: true,
});

module.exports = nextConfig;
```

## Storybook Setup

### install

```
npx sb init --builder webpack5
npm i -D @storybook/cli@next @emotion/babel-plugin-jsx-pragmatic @babel/plugin-transform-react-jsx
```

### .storybook/main.ts

```typescript
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
```

## jest + @testring-library Setup

### package install

```
// jest
npm i -D jest jest-dom jest-environment-jsdom ts-jest

// @testing-library
npm i -D @testing-library/user-event @testing-library/react @testing-library/jest-dom @testing-library/dom
```

### make jest.setup.js

```javascript
import '@testing-library/jest-dom/extend-expect';
```

### make jest.config.js

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const babelConfigEmotion = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-macros'),
    require.resolve('@emotion/babel-plugin'),
  ],
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', babelConfigEmotion],
  },
};

module.exports = createJestConfig(customJestConfig);
```
