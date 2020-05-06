import React from 'react';
import Remax from 'remax';
import AppContainer from 'remax/esm/AppContainer';
import RecycleView from '../src/index';

jest.mock('remax', () => {
  return { ...jest.requireActual('remax'), Platform: { current: 'wechat' } };
});

describe('src/index.tsx', () => {
  it('should return correct LIST_HEIGHT in wechat', () => {
    const container = new AppContainer({});
    Remax.render(
      <RecycleView data={[{ height: 100 }]} renderItem={() => <div>hello</div>} />,
      container,
    );
    expect(container.root.toJSON()).toMatchSnapshot();
  });
});
