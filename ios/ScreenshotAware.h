
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNScreenshotAwareSpec.h"

@interface ScreenshotAware : NSObject <NativeScreenshotAwareSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ScreenshotAware : NSObject <RCTBridgeModule>
#endif

@end
