#import "ScreenshotAwareImpl.h"
#import <React/RCTUtils.h>

static NSString *const kRNScreenshotAwareEventName = @"ScreenshotAwareEvent";

@implementation ScreenshotAwareImpl

+ (NSArray<NSString *> *)supportedEvents
{
    return @[kRNScreenshotAwareEventName];
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self
                                              selector:@selector(screenshotDetected:)
                                              name:UIApplicationUserDidTakeScreenshotNotification
                                              object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)screenshotDetected:(NSNotification *)notification
{
    [self.delegate handleEventWithName:kRNScreenshotAwareEventName];
}

@end