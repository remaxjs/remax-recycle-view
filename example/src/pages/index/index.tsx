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
