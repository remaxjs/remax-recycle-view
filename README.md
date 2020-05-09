# remax-recycle-view

[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][codecov-image]][codecov-url] [![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/remax-recycle-view.svg?style=flat-square
[npm-url]: https://npmjs.org/package/remax-recycle-view
[travis-image]: https://img.shields.io/travis/remaxjs/remax-recycle-view.svg?style=flat-square
[travis-url]: https://travis-ci.org/remaxjs/remax-recycle-view
[codecov-image]: https://codecov.io/gh/remaxjs/remax-recycle-view/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/remaxjs/remax-recycle-view
[download-image]: https://img.shields.io/npm/dm/remax-recycle-view.svg?style=flat-square
[download-url]: https://npmjs.org/package/remax-recycle-view

利用虚拟滚动技术的长列表组件，解决了长列表渲染的性能问题。

<div align=center>
	<img src="https://github.com/remaxjs/remax-recycle-view/blob/master/example.gif?raw=true" />
</div>
---

## Install

```bash
$ npm i remax-recycle-view --save
```

## Usage

```tsx
import React from 'react';
import { View } from 'remax/one';
import RecycleView from '../../../../src/index';
import styles from './index.css';

const mockData: { height: number; [key: string]: any }[] = [];
for (let i = 0; i < 500; i++) {
  mockData.push({
    height: ((i % 5) + 1) * 100,
    text: `mock block ${i}`,
  });
}

export default () => {
  return (
    <View className={styles.app}>
      <RecycleView
        className={styles.recycleView}
        placeholderImage="https://gw.alicdn.com/tfs/TB18fUJCxD1gK0jSZFyXXciOVXa-750-656.png"
        data={mockData}
        headerHeight={200}
        bottomHeight={300}
        renderHeader={() => {
          return <View style={{ height: 200, backgroundColor: 'yellow' }}>this is header</View>;
        }}
        renderBottom={() => {
          return <View style={{ height: 300, backgroundColor: 'yellow' }}>this is bottom</View>;
        }}
        renderItem={({ text, __index__ }) => {
          const colors = ['purple', 'red', 'blue'];
          const color = colors[__index__ % 3];
          return (
            <View style={{ backgroundColor: color, color: '#fff', height: '100%' }}>{text}</View>
          );
        }}
      />
    </View>
  );
};
```

## API

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| className | string | 否 | 无 | class 样式名称 |
| style | React.CSSProperties | 否 | 无 | React 行内样式 |
| data | {height: number; [key:string]: any}[] | 否 | [] | 需要渲染的长列表数据(每条数据必须要有 height 表示高度) |
| overscanCount | number | 否 | 5 | 预渲染的个数(会渲染前 overscanCount 个,和后 2 \* overscanCount 个) |
| placeholderImage | string | 否 | 无 | 对于来不及渲染的元素，可以用一个图片地址来作为背景 |
| headerHeight | number | 否 | 0 | 如果有 renderHeader 属性方法，则必须要有 headerHeight 表示头部的高度 |
| bottomHeight | number | 否 | 0 | 如果有 renderBottom 属性方法，则必须要有 bottomHeight 表示底部的高度 |
| renderHeader | () => React.ReactElement | 否 | 无 | 渲染头部的方法，会作为长列表的头部进行加载 |
| renderBottom | () => React.ReactElement | 否 | 无 | 渲染底部的方法，会作为长列表的底部进行加载 |
| renderItem | (item: Item, index: number) => React.ReactElement | 是 | 无 | 渲染每条数据的方法，注意： 该方法中的 index 不代表该条目在总数据中的 index，如果需要在总数据中的 index， 请使用 item['__index__'] |

**除了以上属性，你还可以传当前平台 scroll-view 支持的任意属性来实现业务逻辑，比如： 支付宝小程序通过`lower-threshold`和`onScrollToLower`实现下滑加载更多的业务逻辑**

## License

[MIT](LICENSE)
