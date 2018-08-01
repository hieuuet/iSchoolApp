//
//  SwiftComponentManagerBridge.m
//  ReactNativeSwift
//
//  Created by Hieu Tran on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(SwiftComponentManager, NSObject)

// Type 1: Calling a Swift function from JavaScript
RCT_EXTERN_METHOD(helloSwift:(NSString *)greeting)

RCT_EXTERN_METHOD(iSchollDemo:(NSString *)cameralist)

@end
