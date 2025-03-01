import { withAndroidManifest } from "@expo/config-plugins";
import withReactNativeScreenshotAware from "../plugin/withReactNativeScreenshotAware";

// Mock the Expo config plugins
jest.mock("@expo/config-plugins", () => {
  return {
    withAndroidManifest: jest.fn((config) => {
      // Just return the config to simulate the plugin chain
      return config;
    }),
  };
});

describe("withReactNativeScreenshotAware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls withAndroidManifest with the correct config", () => {
    const mockConfig = { name: "test-app", slug: "test-app" };

    withReactNativeScreenshotAware(mockConfig);

    expect(withAndroidManifest).toHaveBeenCalledWith(
      mockConfig,
      expect.any(Function),
    );
  });

  it("adds DETECT_SCREEN_CAPTURE permission when not present", () => {
    const mockConfig = { name: "test-app", slug: "test-app" };

    withReactNativeScreenshotAware(mockConfig);

    const configToTransform = {
      modResults: { manifest: { "uses-permission": [] } },
    };

    const transformerFn = (withAndroidManifest as jest.Mock).mock.calls[0][1];

    const result = transformerFn(configToTransform);

    expect(result.modResults.manifest["uses-permission"]).toContainEqual({
      $: {
        "android:name": "android.permission.DETECT_SCREEN_CAPTURE",
      },
    });
  });

  it("does not add duplicate permissions", () => {
    const mockConfig = { name: "test-app", slug: "test-app" };

    withReactNativeScreenshotAware(mockConfig);

    const configToTransform = {
      modResults: {
        manifest: {
          "uses-permission": [
            {
              $: {
                "android:name": "android.permission.DETECT_SCREEN_CAPTURE",
              },
            },
          ],
        },
      },
    };

    const transformerFn = (withAndroidManifest as jest.Mock).mock.calls[0][1];

    const result = transformerFn(configToTransform);

    expect(result.modResults.manifest["uses-permission"].length).toBe(1);
  });

  it("creates uses-permission array if not present", () => {
    const mockConfig = { name: "test-app", slug: "test-app" };

    withReactNativeScreenshotAware(mockConfig);

    const configToTransform = {
      modResults: {
        manifest: {},
      },
    };

    const transformerFn = (withAndroidManifest as jest.Mock).mock.calls[0][1];

    const result = transformerFn(configToTransform);

    expect(result.modResults.manifest["uses-permission"]).toBeInstanceOf(Array);
    expect(result.modResults.manifest["uses-permission"]).toContainEqual({
      $: {
        "android:name": "android.permission.DETECT_SCREEN_CAPTURE",
      },
    });
  });
});
