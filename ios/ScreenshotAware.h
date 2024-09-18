#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "ScreenshotAwareSpec.h"

@interface ScreenshotAware : RCTEventEmitter <RCTBridgeModule>
#else
#import <React/RCTBridgeModule.h>

@interface ScreenshotAware : RCTEventEmitter <RCTBridgeModule>
#endif

@end
