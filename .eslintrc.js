module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-unresolved': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/camelcase': 'off',
    'react/no-danger': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
  },
};
