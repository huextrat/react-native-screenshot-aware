import { useEffect } from "react";
import { NativeEventEmitter } from "react-native";
import NativeScreenshotAware from "./codegenSpec/NativeScreenshotAware";

const moduleEventEmitter = new NativeEventEmitter(NativeScreenshotAware);

export const useScreenshotAware = (callback: () => void) => {
  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      "ScreenshotEvent",
      callback,
    );
    return () => subscription.remove();
  }, [callback]);
};

export default {
  addListener: (callback: () => void) => {
    return moduleEventEmitter.addListener("ScreenshotEvent", callback);
  },
  removeAllListeners: () =>
    moduleEventEmitter.removeAllListeners("ScreenshotEvent"),
};
