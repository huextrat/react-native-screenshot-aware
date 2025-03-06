import { renderHook } from "@testing-library/react-native";
import { NativeEventEmitter } from "react-native";
import NativeScreenshotAware from "../codegenSpec/NativeScreenshotAware";
import { useScreenshotAware } from "../index";
import ScreenshotAware from "../index";

describe("ScreenshotAware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add and remove listener in useScreenshotAware hook", () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useScreenshotAware(callback));

    expect(NativeScreenshotAware.addListener).toHaveBeenCalledWith(
      "ScreenshotAwareEvent",
    );

    unmount();
    expect(NativeScreenshotAware.removeListeners).toHaveBeenCalledWith(1);
  });

  it("should call the callback when a screenshot event occurs", () => {
    const callback = jest.fn();
    renderHook(() => useScreenshotAware(callback));

    new NativeEventEmitter(NativeScreenshotAware).emit("ScreenshotAwareEvent");

    expect(callback).toHaveBeenCalled();
  });

  it("should add and remove listener in ScreenshotAware module", () => {
    const callback = jest.fn();
    const subscription = ScreenshotAware.addListener(callback);

    expect(NativeScreenshotAware.addListener).toHaveBeenCalledWith(
      "ScreenshotAwareEvent",
    );

    subscription.remove();
    expect(NativeScreenshotAware.removeListeners).toHaveBeenCalledWith(1);
  });

  it("should remove all listeners in ScreenshotAware module", () => {
    ScreenshotAware.removeAllListeners();

    expect(NativeScreenshotAware.removeListeners).toHaveBeenCalled();
  });
});
