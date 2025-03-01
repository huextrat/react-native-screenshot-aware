import { withAndroidManifest } from "@expo/config-plugins";
import type { ConfigPlugin } from "expo/config-plugins";

/**
 * Modifies the `AndroidManifest.xml` file to add `DETECT_SCREEN_CAPTURE` permission,
 * allowing the app to detect screen capture.
 *
 * @param {ConfigPlugin} config - The Expo configuration object.
 * @returns {ConfigPlugin} - The modified Expo configuration.
 */
const withCustomAndroidManifest: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;

    if (!androidManifest.manifest["uses-permission"]) {
      androidManifest.manifest["uses-permission"] = [];
    }

    // Check if the permission already exists
    const permissionExists = androidManifest.manifest["uses-permission"].some(
      (permission) =>
        permission.$?.["android:name"] ===
        "android.permission.DETECT_SCREEN_CAPTURE",
    );

    // Only add the permission if it doesn't already exist
    if (!permissionExists) {
      androidManifest.manifest["uses-permission"].push({
        $: {
          "android:name": "android.permission.DETECT_SCREEN_CAPTURE",
        },
      });
    }

    return config;
  });
};

/**
 * Applies `withCustomAndroidManifest`
 * to enable screenshot detection on Android.
 *
 * @param {ConfigPlugin} config - The Expo configuration object.
 * @returns {ConfigPlugin} - The modified Expo configuration.
 */
const withReactNativeScreenshotAware: ConfigPlugin = (config) => {
  return withCustomAndroidManifest(config);
};

export default withReactNativeScreenshotAware;
