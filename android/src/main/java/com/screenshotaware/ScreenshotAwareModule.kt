package com.screenshotaware

import android.app.Activity
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class ScreenshotAwareModule internal constructor(context: ReactApplicationContext) :
  ScreenshotAwareSpec(context) {

  private var screenCaptureCallback = Activity.ScreenCaptureCallback {
    sendEvent()
  }

  override fun getName(): String {
    return NAME
  }

  override fun initialize() {
    super.initialize()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      reactApplicationContext.currentActivity?.let {
        currentActivity?.registerScreenCaptureCallback(it.mainExecutor, screenCaptureCallback)
      }
    }
  }

  override fun invalidate() {
    super.invalidate()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      currentActivity?.unregisterScreenCaptureCallback(screenCaptureCallback)
    }
  }

  private fun sendEvent() {
    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(EVENT_NAME, null)
  }

  @ReactMethod
  override fun addListener(eventName: String?) {
  }

  @ReactMethod
  override fun removeListeners(count: Double) {
  }

  companion object {
    const val NAME = "ScreenshotAware"
    const val EVENT_NAME: String = "ScreenshotAwareEvent"
  }
}
