# Vanilla JS

## 1. package init
```
npm init -y
```

## 2. install library
```
npm i -D eslint prettier eslint-config-prettier
```

## 3. make `.eslintrc.js`
- eslint 설정의 경우 협업 환경에 따라 여러 조건을 통해 유동적으로 수정합니다.

```
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    sourceType: "module",
  },
}

```

## 4. make `.prettierrc`
- prettier 설정의 경우 협업 환경에 따라 여러 조건을 통해 유동적으로 수정합니다.

```
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
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
  
  // ...
}
```
