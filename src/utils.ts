import { getSystemInfoSync } from './remax';

const systemInfo = getSystemInfoSync();

export function transformRpxToPx(rpx: number) {
  return (rpx / 750) * systemInfo.windowWidth;
}

interface Throttled<T extends (...args: any) => any> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): any;
  cancel(): void;
}

export function throttle<T extends (...args: any) => any>(func: T, wait: number): Throttled<T> {
  let previous = 0;
  let time: ReturnType<typeof setTimeout> | undefined;
  let remaining;

  const throttled = function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = +new Date();
    const context = this;
    remaining = wait - (now - previous);
    if (remaining <= 0) {
      func.apply(context, args);
      previous = now;
    } else {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        func.apply(context, args);
        time = undefined;
        previous = +new Date();
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (time) {
      clearTimeout(time);
    }
  };

  return throttled;
}
