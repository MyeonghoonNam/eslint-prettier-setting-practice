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
