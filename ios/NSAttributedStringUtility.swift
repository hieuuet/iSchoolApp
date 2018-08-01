//
//  NSAttributedStringUtility.swift
//  USGScrollingTabBar
//
//  Created by M.Satori on 16.09.22.
//  Copyright © 2016年 usagimaru. All rights reserved.
//

import UIKit

extension NSAttributedString {
	
	class func attributedString(_ string: String, font: UIFont, color: UIColor, paragraphStyle: NSParagraphStyle) -> NSAttributedString {
    let att = [NSForegroundColorAttributeName: color, NSFontAttributeName: font, NSParagraphStyleAttributeName: paragraphStyle]
		
		let astr = NSMutableAttributedString(string: string, attributes: att)
		return astr
	}
  
}
