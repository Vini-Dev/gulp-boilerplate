module.exports = {
  env: {
    es2020: true,
  },
  globals: {
    window: true,
    document: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
};
