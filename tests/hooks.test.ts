import { renderHook, act } from '@testing-library/react-hooks';
import { useVisibleRange, useSizeData, useScrollTop } from '../src/hooks';

describe('src/hooks.tsx', () => {
  it('should return correct start and end', () => {
    const { result } = renderHook(({ overscanCount }) => useVisibleRange(overscanCount), {
      initialProps: { overscanCount: 5 },
    });
    expect(result.current[0]).toBe(-5);
    expect(result.current[1]).toBe(10);

    act(() => {
      result.current[2](10);
    });

    expect(result.current[0]).toBe(5);
    expect(result.current[1]).toBe(20);
  });

  it('should return correct size data array', () => {
    const mockData = [{ height: 10 }, { height: 20 }, { height: 30 }];
    const { result } = renderHook(({ data }) => useSizeData(data), {
      initialProps: { data: mockData },
    });
    expect(result.current).toEqual([
      { height: 10, offsetTop: 0 },
      { height: 20, offsetTop: 10 },
      { height: 30, offsetTop: 30 },
    ]);

    // raw data will get __index__ after useSizeData
    expect(mockData).toEqual([
      { height: 10, __index__: 0 },
      { height: 20, __index__: 1 },
      { height: 30, __index__: 2 },
    ]);
  });

  it('should return correct offsetTop when scrollTopByIndex is valid', () => {
    const mockData = [
      { height: 10, offsetTop: 0 },
      { height: 20, offsetTop: 10 },
      { height: 30, offsetTop: 30 },
    ];

    const { result } = renderHook(
      ({ data }) => useScrollTop({ scrollTopByIndex: 1, sizeData: data, scrollTop: 100 }),
      {
        initialProps: { data: mockData },
      },
    );
    expect(result.current).toBe(10);
  });

  it('should return correct scrollTop prop when scrollTopByIndex is undefined', () => {
    const mockData = [
      { height: 10, offsetTop: 0 },
      { height: 20, offsetTop: 10 },
      { height: 30, offsetTop: 30 },
    ];

    const { result } = renderHook(({ data }) => useScrollTop({ sizeData: data, scrollTop: 100 }), {
      initialProps: { data: mockData },
    });
    expect(result.current).toBe(100);
  });
});
