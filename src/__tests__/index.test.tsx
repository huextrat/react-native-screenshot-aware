import { renderHook } from "@testing-library/react-native";
import { NativeEventEmitter } from "react-native";
import NativeScreenshotAware from "../codegenSpec/NativeScreenshotAware";
import { useScreenshotAware } from "../index";
import ScreenshotAware from "../index";

interface NativeModule {
  addListener: (event: string) => void;
  removeListeners: (count: number) => void;
}

const emitter = new NativeEventEmitter(NativeScreenshotAware);
const typedEmitter = emitter as unknown as { _nativeModule: NativeModule };

describe("ScreenshotAware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add and remove listener in useScreenshotAware hook", () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useScreenshotAware(callback));

    expect(typedEmitter._nativeModule.addListener).toHaveBeenCalledWith(
      "ScreenshotAwareEvent",
    );

    unmount();
    expect(typedEmitter._nativeModule.removeListeners).toHaveBeenCalledWith(1);
  });

  it("should call the callback when a screenshot event occurs", () => {
    const callback = jest.fn();
    renderHook(() => useScreenshotAware(callback));

    emitter.emit("ScreenshotAwareEvent");

    expect(callback).toHaveBeenCalled();
  });

  it("should add and remove listener in ScreenshotAware module", () => {
    const callback = jest.fn();
    const subscription = ScreenshotAware.addListener(callback);

    expect(typedEmitter._nativeModule.addListener).toHaveBeenCalledWith(
      "ScreenshotAwareEvent",
    );

    subscription.remove();
    expect(typedEmitter._nativeModule.removeListeners).toHaveBeenCalledWith(1);
  });

  it("should remove all listeners in ScreenshotAware module", () => {
    ScreenshotAware.removeAllListeners();

    expect(typedEmitter._nativeModule.removeListeners).toHaveBeenCalled();
  });
});
