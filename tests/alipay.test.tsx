import React from 'react';
import Remax from 'remax';
import AppContainer from 'remax/esm/AppContainer';
import RecycleView from '../src/index';

jest.mock('remax', () => {
  return { ...jest.requireActual('remax'), Platform: { current: 'alipay' } };
});

describe('src/index.tsx', () => {
  it('should render correct LIST_HEIGHT 100rpx in alipay', () => {
    const container = new AppContainer({});
    Remax.render(
      <RecycleView data={[{ height: 100 }]} renderItem={() => <div>hello</div>} />,
      container,
    );
    expect(container.root.toJSON()).toMatchSnapshot();
  });

  it('should render correct LIST_HEIGHT 0rpx in alipay', () => {
    const container = new AppContainer({});
    Remax.render(<RecycleView renderItem={() => <div>hello</div>} />, container);
    expect(container.root.toJSON()).toMatchSnapshot();
  });
});
