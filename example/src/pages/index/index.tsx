import React from 'react';
import { View } from 'remax/one';
import RecycleView from '../../../../src/index';
import styles from './index.css';

const mockData: { height: number; [key: string]: any }[] = [];
for (let i = 0; i < 2020; i++) {
  mockData.push({
    height: 100,
    text: `row ${i}`,
  });
}

export default () => {
  return (
    <View className={styles.app}>
      <RecycleView
        scrollTopByIndex={100}
        overscanCount={20}
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
        renderItem={({ text }) => {
          return (
            <View
              style={{ backgroundColor: 'white', fontWeight: 'bold', color: 'red', height: '100%' }}
            >
              {text}
            </View>
          );
        }}
      />
    </View>
  );
};
