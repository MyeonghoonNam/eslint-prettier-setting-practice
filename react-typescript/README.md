# Description

CreateReactApp + Typescript + ESLint + Prettier의 초기 환경 셋업 과정

## 1. Install Library

```
$npx create-react-app "프로젝트명" --template typescript

$npm i -D eslint prettier
$npm i -D eslint-config-prettier eslint-plugin-prettier
$npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

$npx install-peerdeps --dev eslint-config-airbnb
```

설치된 프로젝트에서 불필요한 파일들을 제거한다.

## 2. tsconfig.json Update

```
{
	"compilerOptions": {
		"allowJs": true,
		"target": "ES5",
		"module": "ES2015",
		"skipLibCheck": true,
		"outDir": "dist",
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"forceConsistentCasingInFileNames": true,
		"noFallthroughCasesInSwitch": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",
		"moduleResolution": "Node",
		"lib": ["ES2015", "DOM", "DOM.Iterable"],
		"noImplicitAny": true,
		"strict": true,
		"strictNullChecks": true,
		"alwaysStrict": true,
		"strictFunctionTypes": true
	},
	"include": ["src/**/*.tsx"],
	"exclude": ["node_modules", "**/*.spec.tsx"]
}

```

## 3. ESLint

### step 1) VScode extension에서 eslint 설치 <br/>

### step 2) default config 제거

```
// package.json에서 아래 코드 제거

"eslintConfig": {
   "extends": [
     "react-app",
     "react-app/jest"
   ]
 },
```

### step 3) Eslint SetUp

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
		"prettier/prettier": ["error", { "endOfLine": "auto" }],
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
		"react/jsx-props-no-spreading": "off"
	},
	"settings": {
		"import/resolver": {
			"node": {
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	}
}


```

## 4. Prettier

### step 1) VScode extension에서 prettier 설치 <br/>

### step 2) Prettier Setup

```
// .prettierrc.json 파일 생성 및 수정
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": true,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always"
}

```

## 5. VScode setup

```
// settings.json에 아래 코드 추가
{
  ...

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.alwaysShowStatus": true,
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],

 ...
}
```

---

# 번외

## Emotion

### step 1) Emotion Install

```
$npm i @emotion/react
$npm i @emotion/styled
$npm i @emotion/babel-preset-css-prop

$npm i -D @emotion/babel-plugin
```

### step 2) Craco Install

```
$npm i @craco/craco

// npm v7 이상인 경우
$npm i @craco/craco --force
```

### step 3) package.json scripts 태그 수정

```
"scripts": {
  ...

	"start": "craco start",
	"build": "craco build",
	"test": "craco test",

	...
}
```

### step 4) craco.config.js setup

```
// craco.config.js
module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
  },
}
```

### step 5) tsconfig.json update

```
...

"jsxImportSource": "@emotion/react",

...
```

## Storybook

### step 1) Storybook setup

```
$npx sb init
$npm run storybook
```

## CRA + Typescript 절대경로 설정

### step 1) Craco Install

```
$npm i @craco/craco // scripts 태그는 위에서 언급한바와 같이 변경
$npm i -D craco-alias
```

### step 2) tsconfig.paths.json update

```
{
	"compilerOptions": {
		"baseUrl": "./src",
		"paths": {
			// ex)
			// "@components/*": ["./components/*"]
			// "@assets/*": ["./assets/*"],
			// "@styles/*": ["./styles/*"],
			// "@contexts/*": ["./contexts/*"],
			// "@hooks/*": ["./hooks/*"],
			// "@utils/*": ["./utils/*"]
		}
	}
}

```

### step 3) craco.config.js update

```
// craco.cofig.js
const cracoAlias = require('craco-alias')

module.exports = {
  ...

  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
}
```

### step 4) import/no-unresolved error 해결

```
$npm i -D eslint-import-resolver-typescript

// eslintrc.json rule 업데이트
...

"settings": {
		"import/resolver": {
			"node": {
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			},
			"typescript": {}
		}
	}

...

```

## Storybook 절대경로 설정

```
// .storybook => main.js
const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-create-react-app',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					'@components': path.resolve(__dirname, '../src/components'),
				},
			},
		};
	},
};

```
