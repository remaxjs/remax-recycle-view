import React, { PropsWithChildren } from 'react';
import { ScrollView as ToutiaoScrollView, ScrollViewProps, getSystemInfoSync } from 'remax/toutiao';

export type { ScrollViewProps } from 'remax/toutiao';

const ScrollViewRender: React.ForwardRefRenderFunction<any, PropsWithChildren<ScrollViewProps>> = (
  props,
  ref,
) => {
  const { children, ...scrollViewProps } = props;
  return (
    <ToutiaoScrollView {...scrollViewProps} ref={ref}>
      {children}
    </ToutiaoScrollView>
  );
};

export const ScrollView = React.forwardRef(ScrollViewRender);

export const systemInfo = getSystemInfoSync();
