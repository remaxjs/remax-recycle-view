import * as React from 'react';
import { View } from 'remax/one';
import RecycleView from '../../../../src/index';
import styles from './index.css';

export default () => {
  return (
    <View className={styles.app}>
      <RecycleView data={[{ height: 100 }]} renderItem={() => <View />} />
    </View>
  );
};
