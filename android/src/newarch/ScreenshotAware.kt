package com.screenshotaware

import com.facebook.react.bridge.ReactApplicationContext

abstract class ScreenshotAwareSpec internal constructor(context: ReactApplicationContext) :
  NativeScreenshotAwareSpec(context) {
}
