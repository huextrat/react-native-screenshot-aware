jest.mock("react-native/Libraries/TurboModule/TurboModuleRegistry", () => ({
  getEnforcing: jest.fn((moduleName: string) => {
    if (moduleName === "ScreenshotAware") {
      return {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
      };
    }
    return {};
  }),
}));
