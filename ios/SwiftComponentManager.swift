//
//  SwiftComponentManager.swift
//  ReactNativeSwift
//
//  Created by Hieu Tran on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import UIKit

// SwiftComponentManager

extension String {
  func toJSON() -> Any? {
    guard let data = self.data(using: .utf8, allowLossyConversion: false) else { return nil }
    return try? JSONSerialization.jsonObject(with: data, options: .mutableContainers)
  }
}

@objc(SwiftComponentManager)
class SwiftComponentManager: NSObject {
  
  @objc func helloSwift(_ greeting: String){
    let storyboard = UIStoryboard(name: "Main", bundle: nil)
    let controller = storyboard.instantiateViewController(withIdentifier: "FirstView") as! FirstViewController
    controller.greeting = greeting
    
    DispatchQueue.main.sync {
      let topRootViewController: UIViewController = (UIApplication.shared.keyWindow?.rootViewController)!
      topRootViewController.present(controller, animated: true, completion: nil)
    }
  }
  
  func convertToDictionary(text: String) -> [String: Any]? {
    if let data = text.data(using: .utf8) {
      do {
        return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
      } catch {
        print(error.localizedDescription)
      }
    }
    return nil
  }
  
  func convertToArray(text: String) -> [Any]? {
    if let data = text.data(using: .utf8) {
      do {
        return try JSONSerialization.jsonObject(with: data, options: []) as? [Any]
      } catch {
        print(error.localizedDescription)
      }
    }
    return nil
  }

  
  @objc func iSchollDemo(_ cameralist: String){
    let storyboard2 = UIStoryboard(name: "Main2", bundle: nil)
    
    //let navi = storyboard2.instantiateViewController(withIdentifier: "navigation") as! UINavigationController
    let controller2 = storyboard2.instantiateViewController(withIdentifier: "secondView") as! SecondViewController
    
    controller2.cameras = cameralist.toJSON() as? Array<Any>
    DispatchQueue.main.sync {
      let topRootViewController: UIViewController = (UIApplication.shared.keyWindow?.rootViewController)!
      topRootViewController.present(controller2, animated: true, completion: nil)
      //topRootViewController.present(navi, animated: true, completion: nil)
      //navi.pushViewController(controller2, animated: true)
    }
  }
  
}

