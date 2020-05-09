import React from 'react';
import {
  ScrollView as AliScrollView,
  ScrollViewProps as AliScrollViewProps,
  getSystemInfoSync as aliGetSystemInfoSync,
} from 'remax/ali';
import {
  ScrollView as WechatScrollView,
  ScrollViewProps as WechatScrollViewProps,
  getSystemInfoSync as wechatGetSystemInfoSync,
} from 'remax/wechat';
import {
  ScrollView as TtScrollView,
  ScrollViewProps as TtScrollViewProps,
  getSystemInfoSync as ttGetSystemInfoSync,
} from 'remax/toutiao';

let ScrollViewWrapper: typeof AliScrollView | typeof TtScrollView | typeof WechatScrollView;

if (process.env.REMAX_PLATFORM === 'ali') {
  ScrollViewWrapper = AliScrollView;
} else if (process.env.REMAX_PLATFORM === 'wechat') {
  ScrollViewWrapper = WechatScrollView;
} else if (process.env.REMAX_PLATFORM === 'toutiao') {
  ScrollViewWrapper = TtScrollView;
} else {
  throw new Error(`current platform ${process.env.REMAX_PLATFORM} is unknown`);
}

export type ScrollViewProps = React.PropsWithChildren<
  AliScrollViewProps & WechatScrollViewProps & TtScrollViewProps
>;

const ScrollViewRender: React.ForwardRefRenderFunction<any, ScrollViewProps> = (props, ref) => {
  const { children, ...scrollViewProps } = props;
  return (
    <ScrollViewWrapper {...scrollViewProps} ref={ref}>
      {children}
    </ScrollViewWrapper>
  );
};

export const ScrollView = React.forwardRef(ScrollViewRender);

function getSystemInfo() {
  if (process.env.REMAX_PLATFORM === 'ali') {
    return aliGetSystemInfoSync();
  }
  if (process.env.REMAX_PLATFORM === 'wechat') {
    return wechatGetSystemInfoSync();
  }

  /* istanbul ignore else */
  if (process.env.REMAX_PLATFORM === 'toutiao') {
    return ttGetSystemInfoSync();
  }

  // this case has been thrown before
  /* istanbul ignore next */
  throw new Error(`current platform ${process.env.REMAX_PLATFORM} is unknown`);
}

type SystemInfo =
  | ReturnType<typeof wechatGetSystemInfoSync>
  | ReturnType<typeof aliGetSystemInfoSync>
  | ReturnType<typeof ttGetSystemInfoSync>;

export const systemInfo: SystemInfo = getSystemInfo();
