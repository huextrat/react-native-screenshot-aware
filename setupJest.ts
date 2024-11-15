jest.mock("react-native/Libraries/BatchedBridge/NativeModules", () => ({
  ScreenshotAware: {
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  },
  PlatformConstants: {},
}));
