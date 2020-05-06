import { systemInfo } from './remax';

export function transformRpxToPx(rpx: number) {
  return (rpx / 750) * systemInfo.windowWidth;
}

export function transformPxToRpx(px: number) {
  return (px / systemInfo.windowWidth) * 750;
}
