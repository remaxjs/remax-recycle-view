/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';

describe('src/index.tsx', () => {
  it(`should render correct LIST_HEIGHT 0rpx when no data`, () => {
    jest.isolateModules(() => {
      const RecycleView = require('../src/index').default;
      const component = renderer.create(<RecycleView renderItem={() => <div>hello</div>} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it(`should render correct LIST_HEIGHT 200rpx`, () => {
    jest.isolateModules(() => {
      const RecycleView = require('../src/index').default;
      const component = renderer.create(
        <RecycleView
          data={[{ height: 100 }, { height: 100 }]}
          renderItem={() => <div>hello</div>}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('should render placeholder-image, header and bottom', () => {
    jest.isolateModules(() => {
      const RecycleView = require('../src/index').default;
      const component = renderer.create(
        <RecycleView
          headerHeight={50}
          bottomHeight={50}
          renderHeader={() => <div>header</div>}
          renderBottom={() => <div>bottom</div>}
          placeholderImage="https://via.placeholder.com/150"
          data={[{ height: 100 }]}
          renderItem={() => <div>hello</div>}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('should render correct items when handle scroll', () => {
    jest.isolateModules(() => {
      const RecycleView = require('../src/index').default;
      const { ScrollView } = require('../src/remax');
      const mockData = [];
      let testNumber = 0;
      for (let i = 0; i < 500; i++) {
        mockData.push({
          height: 100,
          text: i,
        });
      }
      const component = renderer.create(
        <RecycleView
          className="recycle-view"
          onScroll={() => {
            testNumber++;
          }}
          data={mockData}
          overscanCount={5}
          headerHeight={100}
          bottomHeight={100}
          renderHeader={() => {
            return <div style={{ height: 100, backgroundColor: 'yellow' }}>this is header</div>;
          }}
          renderBottom={() => {
            return <div style={{ height: 100, backgroundColor: 'yellow' }}>this is bottom</div>;
          }}
          renderItem={({ text }) => {
            return <div style={{ height: '100%' }}>{text}</div>;
          }}
        />,
      );
      const instance = component.root;
      const recycleView = instance.findByType(ScrollView);

      const itemCount = (component.toJSON().children[1] as any).children[0].children.length;
      expect(itemCount).toBe(11);

      // mock scroll to middle
      renderer.act(() => {
        const handleScroll = recycleView.props.onScroll;
        handleScroll({ detail: { scrollTop: 25150, scrollHeight: 50200 } });
      });

      const items = (component.toJSON().children[1] as any).children[0].children;
      const itemCountAfterScroll = items.length;
      expect(itemCountAfterScroll).toBe(16);
      expect(items[0].children[0].children[0]).toBe('245');
      expect(testNumber).toBe(1);
    });
  });
});
