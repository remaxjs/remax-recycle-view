module.exports = {
  globals: {
    __REMAX_HOST_COMPONENTS__: {},
    __REMAX_PX2RPX__: true,
  },
  transformIgnorePatterns: ['node_modules/(?!(.*remax.*))'],
  setupFiles: ['./tests/setup.js'],
};
