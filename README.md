# React Native Screenshot Aware

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-screenshot-aware"><img src="https://img.shields.io/npm/v/react-native-screenshot-aware.svg?style=flat-square" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/react-native-screenshot-aware"><img src="https://img.shields.io/npm/dm/react-native-screenshot-aware.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://github.com/huextrat/react-native-screenshot-aware/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-native-screenshot-aware.svg?style=flat-square" alt="license"></a>
</p>

<h3 align="center">
  Real-time screenshot detection for React Native apps
</h3>

## Features

- 🚀 Real-time screenshot detection
- 🔄 Cross-platform support (iOS & Android)
- 🎣 Easy-to-use React hooks
- ⚡ Optimized for performance
- 📱 Supports Android 14+ (API level 34+) and iOS 14+
- 🏗️ Supports the new architecture for React Native


## Compatibility

### Version Compatibility

- React Native <0.76, use version 1.2.2 or below 1.2.0 of this package (1.2.1 is buggy)
- React Native >=0.76, use version 1.3.0 or later

## Installation

```sh
yarn add react-native-screenshot-aware
```
or
```sh
npm install react-native-screenshot-aware
```

## Important Notes

### Android
- Supports Android 14+ (API level 34 and above)
- Utilizes the latest Android API for efficient screenshot detection
- Leverages the new `DETECT_SCREEN_CAPTURE` permission introduced in Android 14
- Provides a more privacy-friendly and performant approach to screenshot detection

## Expo

For Expo projects, you can use the Expo plugin in `app.json`

```json
"plugins": [
  "react-native-screenshot-aware"
],
```

or add the permission manually to your `app.json`:

```json
"android": {
  "permissions": ["android.permission.DETECT_SCREEN_CAPTURE"]
}
```

## Bare RN

### Permissions

To use the screenshot detection feature on Android, you need to add the following permission to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.DETECT_SCREEN_CAPTURE" />
```

> **Note**: Callbacks will never be triggered on devices running Android versions below 14. This is due to the reliance on the new `DETECT_SCREEN_CAPTURE` permission and APIs introduced in Android 14, which are not available in earlier versions.

> **Note**: The decision to support only Android 14+ is based on the introduction of new, dedicated screenshot detection APIs. These APIs offer improved performance and respect user privacy better than previous methods. For more details, see the [Android 14 screenshot detection documentation](https://developer.android.com/about/versions/14/features/screenshot-detection).

## API Reference

### `useScreenshotAware(callback)`

This hook allows you to detect when a screenshot is taken on the device. It takes a callback function as an argument, which will be executed whenever a screenshot event is detected.

#### Parameters

- `callback` (function): A function to be called when a screenshot is detected. This function does not take any arguments.

#### Example

```javascript
import { useScreenshotAware } from 'react-native-screenshot-aware';

useScreenshotAware(() => {
  console.log('A screenshot was taken!');
});
```

### `addListener(callback)`

This function allows you to add a listener for the screenshot event. It takes a callback function as an argument, which will be executed whenever a screenshot event is detected.

#### Parameters

- `callback` (function): A function to be called when a screenshot is detected. This function does not take any arguments.

#### Example

```javascript
import ScreenshotAware from 'react-native-screenshot-aware';

useEffect(() => {
  const listener = ScreenshotAware.addListener(() => {
    console.log('A screenshot was taken!');
  });
  return () => {
    listener.remove();
  }
}, [])
```

### `removeAllListeners()`

This function allows you to remove all listeners for the screenshot event.

#### Example

```javascript
import ScreenshotAware from 'react-native-screenshot-aware';

function removeScreenshotListeners() {
  ScreenshotAware.removeAllListeners();
}
```

## Jest Mocks

```javascript
jest.mock('react-native-screenshot-aware', () => ({
  useScreenshotAware: jest.fn(),
  addListener: jest.fn().mockReturnValue({
    remove: jest.fn(),
  }),
  removeAllListeners: jest.fn(),
}));
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you like this project, please consider supporting it by giving it a ⭐️ on GitHub!

## Acknowledgements

- [create-react-native-library](https://github.com/callstack/react-native-builder-bob) for the initial project setup