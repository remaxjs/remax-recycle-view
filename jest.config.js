module.exports = {
  globals: {
    __REMAX_HOST_COMPONENTS__: {},
    __REMAX_PX2RPX__: true,
    __REMAX_ENTRY_INFO__: {},
    __REMAX_PAGE_EVENTS__: {},
    __REMAX_APP_EVENTS__: [
      'onLaunch',
      'onShow',
      'onHide',
      'onShareAppMessage',
      'onPageNotFound',
      'onError',
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(.*remax.*))'],
  coveragePathIgnorePatterns: ['/node_modules/', '/example/'],
  setupFiles: ['./tests/setup.js'],
};
