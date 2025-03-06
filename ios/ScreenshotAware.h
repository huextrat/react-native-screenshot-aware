#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "generated/ScreenshotAwareSpec/ScreenshotAwareSpec.h"

@interface ScreenshotAware : RCTEventEmitter <RCTBridgeModule>
#else
#import <React/RCTBridgeModule.h>

@interface ScreenshotAware : RCTEventEmitter <RCTBridgeModule>
#endif

@end
