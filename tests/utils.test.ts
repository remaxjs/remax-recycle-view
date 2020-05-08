import sinon from 'sinon';
import { throttle } from '../src/utils';

describe('src/utils.ts - throttle', () => {
  let clock: ReturnType<typeof sinon.useFakeTimers>;
  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date());
  });

  afterEach(() => {
    clock.restore();
  });

  it('should throttle', () => {
    const func = jest.fn();
    const throttledFunc = throttle(func, 1000);

    // Call it immediately
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    // Call it several times with 100ms between each call
    for (let i = 0; i < 21; i++) {
      clock.tick(100);
      throttledFunc();
    }

    expect(func).toHaveBeenCalledTimes(3);

    // wait 1500ms
    clock.tick(1500);
    expect(func).toHaveBeenCalledTimes(4);
  });
});
