package com.screenshotaware

import android.app.Activity
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ScreenshotAwareModule.NAME)
class ScreenshotAwareModule internal constructor(reactContext: ReactApplicationContext) :
  ScreenshotAwareSpec(reactContext) {

  private var screenCaptureCallback: Any? = null

  override fun getName(): String {
    return NAME
  }

  override fun initialize() {
    super.initialize()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      initializeScreenCaptureCallback()
    }
  }

  @androidx.annotation.RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
  private fun initializeScreenCaptureCallback() {
    screenCaptureCallback = Activity.ScreenCaptureCallback {
      sendEvent()
    }
    reactApplicationContext.currentActivity?.let {
      it.registerScreenCaptureCallback(it.mainExecutor, screenCaptureCallback as Activity.ScreenCaptureCallback)
    }
  }

  override fun invalidate() {
    super.invalidate()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      unregisterScreenCaptureCallback()
    }
  }

  @androidx.annotation.RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
  private fun unregisterScreenCaptureCallback() {
    screenCaptureCallback?.let {
      reactApplicationContext.currentActivity?.unregisterScreenCaptureCallback(it as Activity.ScreenCaptureCallback)
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
