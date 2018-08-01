//
//  RootViewController.m
//  iSchool
//
//  Created by Tran Trung Hieu on 5/23/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RootViewController.h"

@interface RootViewController ()

@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void) viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  UIView *statusBar = [[[UIApplication sharedApplication] valueForKey:@"statusBarWindow"] valueForKey:@"statusBar"];
  
  if ([statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
    
    statusBar.backgroundColor = [UIColor whiteColor];//set whatever color you like
  }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (UIStatusBarStyle)preferredStatusBarStyle
{
  return UIStatusBarStyleLightContent;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
