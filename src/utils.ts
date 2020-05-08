export function throttle<T extends (...args: any) => any>(
  func: T,
  wait: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => any {
  let previous = 0;
  let time: ReturnType<typeof setTimeout> | undefined;
  let remaining;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
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
}
