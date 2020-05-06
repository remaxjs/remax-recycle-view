import React from 'react';
import { Platform } from 'remax';
import {
  ScrollView as AlipayScrollView,
  ScrollViewProps as AlipayScrollViewProps,
  getSystemInfoSync as alipayGetSystemInfoSync,
} from 'remax/alipay';
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

let ScrollViewWrapper:
  | typeof AlipayScrollView
  | typeof TtScrollView
  | typeof WechatScrollView = WechatScrollView;

switch (Platform.current) {
  case 'alipay':
    ScrollViewWrapper = AlipayScrollView;
    break;
  case 'toutiao':
    ScrollViewWrapper = TtScrollView;
    break;
  case 'wechat':
    ScrollViewWrapper = WechatScrollView;
    break;
  default:
    throw new Error(`current platform ${Platform.current} is unknown`);
}

export type ScrollViewProps = React.PropsWithChildren<
  AlipayScrollViewProps & WechatScrollViewProps & TtScrollViewProps
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
  switch (Platform.current) {
    case 'wechat':
      return wechatGetSystemInfoSync();
    case 'toutiao':
      return ttGetSystemInfoSync();
    case 'alipay':
      return alipayGetSystemInfoSync();
    /* istanbul ignore next */
    // this case has been thrown before
    default:
      throw new Error(`current platform ${Platform.current} is unknown`);
  }
}

type SystemInfo =
  | ReturnType<typeof wechatGetSystemInfoSync>
  | ReturnType<typeof alipayGetSystemInfoSync>
  | ReturnType<typeof ttGetSystemInfoSync>;

export const systemInfo: SystemInfo = getSystemInfo();
