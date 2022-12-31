# Description

React(Next v13)+Typescript+ESLint+Prettier+Storybook의 초기 보일러 플레이트 설정 기록

## React(Next) + Typescript 환경 설정

```
npx create-next-app "프로젝트명" --template typescript
```

## ESLint + Prettier 환경 설정

흔히 사용되는 airbnb eslint rule을 기준으로 적용하였다.

```
npm i -D eslint prettier
npm i -D eslint-config-prettier eslint-plugin-prettier
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

npx install-peerdeps --dev eslint-config-airbnb
```

### step 1) vscode extension 설치

- ESLint extenstion 설치
- Prettier extension 설치

### step 2) Eslint SetUp

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
			}
		}
	}
}

```

## step 3) Prettier SetUp

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
	"endOfLine": "auto"
}
```

## Storybook 환경 설정

```
npx sb init --builder webpack5
```

### step1) 전역 스타일 설정

```
// .storybook/preview.js
import "../styles/globals.css";
```

### step2) Storybook의 Next.js 이미지 최적화 설정

```
// package.json
"scripts": {
-    "storybook": "start-storybook -p 6006",
-    "build-storybook": "build-storybook"
+    "storybook": "start-storybook -p 6006 -s ./public",
+    "build-storybook": "build-storybook -s public"
}

// .storybook/preview.js
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

```

## 절대경로 설정

### step 1) Typescript 절대경로 설정

```
// tsconfig.paths.json
{
	"compilerOptions": {
		"baseUrl": "./",
		"paths": {
			"@pages/*": ["./pages/*"],
			"@styles/*": ["./styles/*"]
		}
	}
}

```

```
// tsconfig.json
{
	"extends": "./tsconfig.paths.json", // 추가
	"compilerOptions": {
    	...
     }

}


```

### step 2) Storybook 절대경로 설정

```
// .storybook/main.js
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

```

## tailwindCSS 환경 설정

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### step 1) tailwind.config 설정

```
// tailwind.config.js

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],
};

```

### step 2) globals.css 설정

```
globals.css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### step 3) storybook과 tailwind 환경 통합

```
npm i -D @storybook/addon-postcss
npm i -D storybook-css-modules-preset // postcss환경과 기존 css 모듈 혼합사용시 설치

// .storybook/main.js
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
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
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

```
