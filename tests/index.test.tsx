import React from 'react';
import { render } from 'remax';
import AppContainer from 'remax/esm/AppContainer';

const ENV = ['ali', 'wechat', 'toutiao'];

beforeEach(() => {
  process.env.REMAX_PLATFORM = 'ali';
});

describe('src/index.tsx', () => {
  ENV.forEach(platform => {
    process.env.REMAX_PLATFORM = platform;
    it(`should render correctly in platform ${platform}`, () => {
      return import('../src/index').then((recycleViewModule: any) => {
        const RecycleView = recycleViewModule.default;
        const container = new AppContainer({});
        render(<RecycleView renderItem={() => <div>hello</div>} />, container);
        expect(container.root.toJSON()).toMatchSnapshot();
      });
    });
  });

  it(`should render correct LIST_HEIGHT 200rpx`, () => {
    return import('../src/index').then((recycleViewModule: any) => {
      const RecycleView = recycleViewModule.default;
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
});
