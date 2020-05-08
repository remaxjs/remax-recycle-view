/* eslint-disable global-require */
import React from 'react';
import { render } from 'remax';
import AppContainer from 'remax/esm/AppContainer';

const ENV = ['ali', 'wechat', 'toutiao'];

beforeEach(() => {
  process.env.REMAX_PLATFORM = 'ali';
});

describe('src/index.tsx', () => {
  ENV.forEach(platform => {
    it(`should render correctly in platform ${platform}`, () => {
      jest.isolateModules(() => {
        process.env.REMAX_PLATFORM = platform;
        const RecycleView = require('../src/index').default;
        const container = new AppContainer({});
        render(<RecycleView renderItem={() => <div>hello</div>} />, container);
        expect(container.root.toJSON()).toMatchSnapshot();
      });
    });
  });

  it(`should render correct LIST_HEIGHT 200rpx`, () => {
    jest.isolateModules(() => {
      const RecycleView = require('../src/index').default;
      const container = new AppContainer({});
      render(
        <RecycleView
          data={[{ height: 100 }, { height: 100 }]}
          renderItem={() => <div>hello</div>}
        />,
        container,
      );
      expect(container.root.toJSON()).toMatchSnapshot();
    });
  });

  it('should throw error when platform is unknown', () => {
    jest.isolateModules(() => {
      process.env.REMAX_PLATFORM = 'x';
      expect(() => require('../src/index')).toThrow('current platform x is unknown');
    });
  });

  it('should render placeholder-image, header and bottom', () => {
    jest.isolateModules(() => {
      const RecycleView = require('../src/index').default;
      const container = new AppContainer({});
      render(
        <RecycleView
          headerHeight={50}
          bottomHeight={50}
          renderHeader={() => <div>header</div>}
          renderBottom={() => <div>bottom</div>}
          placeholderImage="https://via.placeholder.com/150"
          data={[{ height: 100 }]}
          renderItem={() => <div>hello</div>}
        />,
        container,
      );
      expect(container.root.toJSON()).toMatchSnapshot();
    });
  });
});
