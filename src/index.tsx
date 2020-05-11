import React from 'react';
import { View } from 'remax/one';
import { ScrollView, ScrollViewProps } from './remax';
import { useVisibleRange, useSizeData } from './hooks';
import { throttle } from './utils';

const DEFAULT_OVERSCAN_COUNT = 5;

// item in data must has height field;
export type Item = {
  height: number;
  [key: string]: any;
};

interface IRecycleProps {
  data?: Item[];
  overscanCount?: number;
  placeholderImage?: string;
  headerHeight?: number;
  bottomHeight?: number;
  renderHeader?: () => React.ReactElement;
  renderBottom?: () => React.ReactElement;
  renderItem: (item: Item, index: number) => React.ReactElement;
}

const isVisible = (start: number, end: number) => (_: any, index: number) =>
  index >= start && index <= end;

const RecycleView: React.ForwardRefRenderFunction<any, IRecycleProps & ScrollViewProps> = (
  props,
  ref,
) => {
  const {
    data = [],
    overscanCount = DEFAULT_OVERSCAN_COUNT,
    placeholderImage,
    renderHeader,
    renderBottom,
    headerHeight = 0,
    bottomHeight = 0,
    renderItem,
    onScroll,
    ...scrollViewProps
  } = props;

  const [start, end, setRange] = useVisibleRange(overscanCount);

  const LIST_HEIGHT = React.useMemo(
    () =>
      data.reduce((totalHeight, ele) => {
        return totalHeight + ele.height;
      }, 0),
    [data],
  );

  const sizeData = useSizeData(data);

  const visibleData = React.useMemo(() => data.filter(isVisible(start, end)), [data, start, end]);

  const handleScroll = React.useMemo(
    () =>
      throttle(function(event: any) {
        const { scrollTop, scrollHeight } = event.detail;

        const ratio = scrollTop / scrollHeight;

        const initialOffsetTop = headerHeight;
        const totalHeight = LIST_HEIGHT + bottomHeight;

        let offset = 0;
        for (let i = 0; i < sizeData.length; i++) {
          const { offsetTop } = sizeData[i];
          const totalOffsetTop = initialOffsetTop + offsetTop;
          if (totalOffsetTop / totalHeight >= ratio) {
            offset = i;
            break;
          }
        }

        setRange(offset);
      }, 100),
    [headerHeight, LIST_HEIGHT, bottomHeight, sizeData],
  );

  React.useEffect(() => {
    return handleScroll.cancel;
  }, [handleScroll]);

  const innerBeforeHeight = (sizeData[start] && sizeData[start].offsetTop) || 0;

  return (
    <ScrollView
      {...scrollViewProps}
      scrollY
      ref={ref}
      onScroll={(e: any) => {
        handleScroll(e);
        onScroll && onScroll(e);
      }}
    >
      {renderHeader && (
        <View className="recycle-view-header" style={{ height: headerHeight }}>
          {renderHeader()}
        </View>
      )}
      <View
        style={{
          position: 'relative',
          height: LIST_HEIGHT,
          background: placeholderImage && `url("${placeholderImage}") repeat-y`,
          backgroundSize: placeholderImage && 'contain',
        }}
      >
        <View style={{ position: 'absolute', left: 0, width: '100%', top: innerBeforeHeight }}>
          {visibleData.map((item, index) => (
            <View
              key={item.__index__}
              style={{ height: item.height }}
              className="recycle-view-item"
            >
              {renderItem(item, index)}
            </View>
          ))}
        </View>
      </View>
      {renderBottom && (
        <View className="recycle-view-bottom" style={{ height: bottomHeight }}>
          {renderBottom()}
        </View>
      )}
    </ScrollView>
  );
};

export default React.forwardRef(RecycleView);
