//
//  rtspplayer.m
//  IJKPlayerTest
//
//  Created by Tran Trung Hieu on 2/26/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "rtspplayer.h"
#import <React/RCTLog.h>
#import "AppDelegate.h"
#import "IJKDemoSampleViewController.h"
#import "IJKCommon.h"
#import "IJKMoviePlayerViewController.h"
#import "IJKDemoSampleViewController.h"

@implementation rtspplayer
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(callCamera:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  AppDelegate *delg =  (AppDelegate*)[UIApplication sharedApplication].delegate;
  
 NSURL* url = [[NSURL alloc] initWithString:@"rtsp://admin:123_hikvision@14.160.75.86:2251/Streaming/Channels/301"];
  
  IJKVideoViewController * playervc = [[IJKVideoViewController alloc] initWithURL:url];
  
  [delg.rootViewController presentViewController:playervc animated:YES completion:^{
    
  }];

}
@end
