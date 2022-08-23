# Vanilla JS

## 1. package init
```
npm init -y
```

## 2. install library
```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier
```

## 3. make `.eslintrc.json`
- eslint 설정의 경우 협업 환경에 따라 여러 조건을 통해 유동적으로 수정합니다.

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```

## 4. make `.prettierrc`
- prettier 설정의 경우 협업 환경에 따라 여러 조건을 통해 유동적으로 수정합니다.

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": true,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## 5. Vscode Setting
- extension `eslint`, `prettier` 를 설치하고 아래와 같이 설정 코드를 추가합니다.

```
{
  // ...

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "eslint.alwaysShowStatus": true,
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },

  // ...
}
```
