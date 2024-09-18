@protocol ScreenshotAwareImplDelegate

- (void)handleEventWithName:(NSString *_Nonnull)name;

@end

@interface ScreenshotAwareImpl : NSObject

+ (NSArray<NSString *> *_Nonnull)supportedEvents;

@property(nonatomic, weak) id<ScreenshotAwareImplDelegate> _Nullable delegate;

@end