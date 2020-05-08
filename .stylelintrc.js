const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: 'page',
      },
    ],
  },
};
