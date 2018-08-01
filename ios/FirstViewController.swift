//
//  FirstViewController.swift
//  ReactNativeSwift
//
//  Created by Hieu Tran on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import UIKit

class FirstViewController : UIViewController{
    @IBOutlet weak var greetingLabel: UILabel!
    var greeting : String = ""
    override func viewDidLoad() {
      super.viewDidLoad()
      self.greetingLabel.text = greeting
    }
}
