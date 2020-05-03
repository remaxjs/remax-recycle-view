import React from 'react';
import { render } from 'remax';
import AppContainer from 'remax/esm/AppContainer';
import Foo from '../src/index';

describe('src/index.tsx', () => {
  it('should return correct VNode structure', () => {
    const container = new AppContainer({});
    render(<Foo />, container);
    expect(container.root.toJSON()).toEqual({
      type: 'root',
      id: 0,
      children: [
        {
          type: 'view',
          props: {},
          id: 2,
          children: [{ text: 'foo', type: 'plain-text' }],
        },
      ],
    });
  });
});
