jest.mock("react-native/Libraries/BatchedBridge/NativeModules", () => ({
  ScreenshotAware: {
    mulitply: jest.fn(),
  },
}));
