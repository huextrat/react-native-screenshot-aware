import { renderHook } from '@testing-library/react-native';
import { NativeEventEmitter } from 'react-native';
import NativeScreenshotAware from '../NativeScreenshotAware';
import ScreenshotAware, { useScreenshotAware } from '../index';

describe('ScreenshotAware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add and remove listener in useScreenshotAware hook', async () => {
    const callback = jest.fn();
    const { unmount } = await renderHook(() => useScreenshotAware(callback));

    expect(NativeScreenshotAware.addListener).toHaveBeenCalledWith(
      'ScreenshotAwareEvent'
    );

    await unmount();
    expect(NativeScreenshotAware.removeListeners).toHaveBeenCalledWith(1);
  });

  it('should call the callback when a screenshot event occurs', async () => {
    const callback = jest.fn();
    await renderHook(() => useScreenshotAware(callback));

    new NativeEventEmitter(NativeScreenshotAware).emit('ScreenshotAwareEvent');

    expect(callback).toHaveBeenCalled();
  });

  it('should add and remove listener in ScreenshotAware module', () => {
    const callback = jest.fn();
    const subscription = ScreenshotAware.addListener(callback);

    expect(NativeScreenshotAware.addListener).toHaveBeenCalledWith(
      'ScreenshotAwareEvent'
    );

    subscription.remove();
    expect(NativeScreenshotAware.removeListeners).toHaveBeenCalledWith(1);
  });

  it('should remove all listeners in ScreenshotAware module', () => {
    ScreenshotAware.removeAllListeners();

    expect(NativeScreenshotAware.removeListeners).toHaveBeenCalled();
  });
});
