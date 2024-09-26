#import "ScreenshotAware.h"
#import "ScreenshotAwareImpl.h"

@interface ScreenshotAware () <ScreenshotAwareImplDelegate>
@end

@implementation ScreenshotAware {
    ScreenshotAwareImpl *moduleImpl;
    BOOL hasListeners;
}

RCT_EXPORT_MODULE()

- (instancetype)init {
    self = [super init];
    if (self) {
        moduleImpl = [ScreenshotAwareImpl new];
        moduleImpl.delegate = self;
    }
    return self;
}

- (void)handleEventWithName:(NSString * _Nonnull)name {
    if (hasListeners) {
        [self sendEventWithName:name body:nil];
    }
}

- (NSArray<NSString *> *)supportedEvents {
    return [ScreenshotAwareImpl supportedEvents];
}

- (void)startObserving
{
    hasListeners = YES;
}

-(void)stopObserving
{
    hasListeners = NO;
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeScreenshotAwareSpecJSI>(params);
}
#endif

@end
