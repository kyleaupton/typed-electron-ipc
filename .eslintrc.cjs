module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier'],
  rules: {
    // Required rules
    'prettier/prettier': 'error',
  },
};
