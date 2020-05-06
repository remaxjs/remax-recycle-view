/* eslint-disable global-require */

describe('src/index.tsx', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('should throw error when platform is unknown for scroll-view', () => {
    jest.doMock('remax', () => {
      return { ...jest.requireActual('remax'), Platform: { current: 'unknown' } };
    });
    expect(() => {
      require('../src/remax.tsx');
    }).toThrow('current platform unknown is unknown');
  });
});
