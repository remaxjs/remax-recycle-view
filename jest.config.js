module.exports = {
  globals: {
    __REMAX_HOST_COMPONENTS__: {},
    my: {},
  },
  transformIgnorePatterns: ['node_modules/(?!(.*remax.*))'],
  setupFiles: ['./tests/setup.js'],
};
