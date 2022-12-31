# Vanilla JS + Typescript

## 1. package init

```
npm init -y
```

## 2. install library

```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier

npx install-peerdeps --dev eslint-config-airbnb-base // airbnb js style 적용

npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## 3. make `.eslintrc.json`

- eslint 설정의 경우 협업 환경에 따라 여러 조건을 통해 유동적으로 수정합니다.

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["airbnb-base", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
}
```

## 4. make `.prettierrc.json`

- prettier 설정의 경우 협업 환경에 따라 여러 조건을 통해 유동적으로 수정합니다.

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

## 5. make `tsconfig.json`

- 기호에 맞게 설정 옵션들을 추가합니다.

```
{
  "compilerOptions": {
    "allowJs": true,
    "target": "ES5",
    "outDir": "dist",
    "moduleResolution": "Node",
    "lib": ["ES2015", "DOM", "DOM.Iterable"],
    "noImplicitAny": true,
    "strict": true,
    "strictNullChecks": true,
    "alwaysStrict": true,
    "strictFunctionTypes": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

## 6. package.json scripts update

```
{
  ...

  {
	"scripts": {
		"build": "tsc --watch"
	},

  ...
}
```

## 7. vscode setting

- extension `eslint`, `prettier` 를 설치하고 아래와 같이 설정 코드를 추가합니다.

```
{
  // ...

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

  // ...
}
```

## 8. test

```
npm run build
```
