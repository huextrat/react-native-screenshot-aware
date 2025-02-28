import { useEffect } from "react";
import { NativeEventEmitter } from "react-native";
import NativeScreenshotAware from "./NativeScreenshotAware";

/**
 * @fileoverview This module provides functionality to detect screenshot events in a React Native application.
 * It exports a hook for functional components and methods for class components to listen for screenshot events.
 */

const moduleEventEmitter = new NativeEventEmitter(NativeScreenshotAware);

/**
 * A React hook that listens for screenshot events and triggers a callback when a screenshot is taken.
 *
 * @param {() => void} callback - The function to be called when a screenshot event occurs.
 *
 * @example
 * ```jsx
 * import { useScreenshotAware } from 'react-native-screenshot-aware';
 *
 * function MyComponent() {
 *   useScreenshotAware(() => {
 *     console.log('A screenshot was taken!');
 *   });
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export const useScreenshotAware = (callback: () => void) => {
  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      "ScreenshotAwareEvent",
      callback,
    );
    return () => subscription.remove();
  }, [callback]);
};

/**
 * Module object for managing screenshot event listeners.
 * Useful for class components or non-React contexts.
 *
 * @example
 * ```jsx
 * import ScreenshotAware from 'react-native-screenshot-aware';
 *
 * class MyComponent extends React.Component {
 *   componentDidMount() {
 *     this.subscription = ScreenshotAware.addListener(() => {
 *       console.log('A screenshot was taken!');
 *     });
 *   }
 *
 *   componentWillUnmount() {
 *     this.subscription.remove();
 *   }
 *
 *   render() {
 *     return <View>...</View>;
 *   }
 * }
 * ```
 */
const ScreenshotAware = {
  /**
   * Adds a listener for screenshot events.
   *
   * @param {() => void} callback - The function to be called when a screenshot event occurs.
   * @returns {import('react-native').EmitterSubscription} A subscription object that can be used to remove the listener.
   */
  addListener: (callback: () => void) => {
    return moduleEventEmitter.addListener("ScreenshotAwareEvent", callback);
  },

  /**
   * Removes all listeners for screenshot events.
   */
  removeAllListeners: () =>
    moduleEventEmitter.removeAllListeners("ScreenshotAwareEvent"),
};

export default ScreenshotAware;
