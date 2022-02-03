module.exports = {
  env: { 
    browser: true, 
    commonjs: true, 
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: { 
    ecmaVersion: 'latest' 
  },
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'no-console': 0,
  },
};
