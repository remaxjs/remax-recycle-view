import React from 'react';
import { ScrollView, ScrollViewProps } from './remax';

// const DEFAULT_OVERSCAN_COUNT = 5;

// item in data must has height field;
type Item = {
  height: number;
  [key: string]: any;
};

interface IRecycleProps {
  data?: Item[];
  overscanThreshold?: number;
  overscanCount?: number;
  placeholderImage?: string;
  renderHeader?: () => React.ReactElement;
  renderBottom?: () => React.ReactElement;
  renderItem: (item: Item, index: number) => React.ReactElement;
}

const RecycleView: React.FunctionComponent<IRecycleProps & ScrollViewProps> = props => {
  const { data = [] } = props;
  const LIST_HEIGHT = React.useMemo(
    () =>
      data.reduce((totalHeight, ele) => {
        return totalHeight + ele.height;
      }, 0),
    [data],
  );
  return <ScrollView style={{ height: LIST_HEIGHT }}>hello world.</ScrollView>;
};

export default RecycleView;
