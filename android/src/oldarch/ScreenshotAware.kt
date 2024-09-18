package com.screenshotaware

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class ScreenshotAwareSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  
  abstract fun addListener(eventName: String?)
  abstract fun removeListeners(count: Double)
}
