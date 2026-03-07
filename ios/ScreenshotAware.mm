#import "ScreenshotAware.h"
#import "ScreenshotAwareImpl.h"

@interface ScreenshotAware () <ScreenshotAwareImplDelegate>
@end

@implementation ScreenshotAware {
  ScreenshotAwareImpl *moduleImpl;
  BOOL hasListeners;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    moduleImpl = [ScreenshotAwareImpl new];
    moduleImpl.delegate = self;
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
  (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeScreenshotAwareSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"ScreenshotAware";
}

- (void)handleEventWithName:(NSString * _Nonnull)name {
  if (hasListeners) {
    [super sendEventWithName:name body:nil];
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return [ScreenshotAwareImpl supportedEvents];
}

- (void)startObserving {
  hasListeners = YES;
}

- (void)stopObserving {
  hasListeners = NO;
}

@end
