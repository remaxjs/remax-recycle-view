import React, { PropsWithChildren } from 'react';
import { ScrollView as WechatScrollView, ScrollViewProps, getSystemInfoSync } from 'remax/wechat';

export type { ScrollViewProps } from 'remax/wechat';

const ScrollViewRender: React.ForwardRefRenderFunction<any, PropsWithChildren<ScrollViewProps>> = (
  props,
  ref,
) => {
  const { children, ...scrollViewProps } = props;
  return (
    <WechatScrollView {...scrollViewProps} ref={ref}>
      {children}
    </WechatScrollView>
  );
};

export const ScrollView = React.forwardRef(ScrollViewRender);

export const systemInfo = getSystemInfoSync();
