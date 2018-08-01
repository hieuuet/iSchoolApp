//
//  SecondViewController.swift
//  ReactNativeSwift
//
//  Created by Hieu Tran on 3/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//


import UIKit

class SecondViewController : UIViewController{
  @IBOutlet weak var scrollingTabBar: USGScrollingTabBar!
  @IBOutlet weak var focusView: UIView!
  @IBOutlet weak var collectionView: UICollectionView!
  @IBOutlet weak var videoView: UIView!
  @IBOutlet weak var backButton: UIButton!
  @IBOutlet weak var setttingButton: UIButton!
  
  @IBOutlet weak var headerView: UIView!
  var tabItems = [USGScrollingTabItem]()
  var cameras:Array<Any>?
  var currentSensorList:Array<Dictionary<String,String>>?
  
  var videoPlayerSmallFrame  : CGRect = .zero
  var isExpanded:Bool = false
  var _lastContentOffset: CGPoint = .zero
  fileprivate let reuseIdentifier = "MainCell"
  
  fileprivate let sectionInsets = UIEdgeInsets(top: 10.0, left: 10.0, bottom: 10.0, right: 10.0)
  //    fileprivate let sectionInsets = UIEdgeInsets.zero
  fileprivate let itemsPerRow: CGFloat = 3
  
  var videoViewGesture:UITapGestureRecognizer?
  var windowGesture:UITapGestureRecognizer?
  
  
  
  var ijkPlayer : IJKVideoViewController?
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    scrollingTabBar.delegate = self
    scrollingTabBar.tabBarInset = 8
    scrollingTabBar.tabInset = 12
    scrollingTabBar.tabSpacing = 1
    scrollingTabBar.focusVerticalMargin = 4
    scrollingTabBar.setFocusView(focusView)
    self.videoView.layer.zPosition = 1;

    
    buildSampleItems()
  }
  
  
  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
  }
  
  override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
  }
  
  override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
  }
  
  override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    
    view.layoutIfNeeded()
    
    
    let firstPageIndex = 0
    
    focusView.layer.cornerRadius = (scrollingTabBar.height - scrollingTabBar.focusVerticalMargin * 2.0) / 2.0
    scrollingTabBar.reloadTabs(tabItems, indexOf: firstPageIndex)
    scrollingTabBar.selectTabAtIndex(firstPageIndex, animated: true);
    

    
    DispatchQueue.main.async {
      let camera = self.cameras?[firstPageIndex]
      let cameraDic: Dictionary<String,Any> = camera as! Dictionary<String,Any>
      self.reloadByCamera(cameraDic: cameraDic)
    }

//    let statusBgColor =  UIColor(red: 0, green: 165/255, blue: 1, alpha: 1)
//    self.setStatusBarBackgroundColor(color: statusBgColor);
    windowGesture = UITapGestureRecognizer(target: self, action: #selector(self.fullScreenCamera(_:)))
    windowGesture?.isEnabled = false;
    self.view.addGestureRecognizer(windowGesture!)
  }

  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
  
  func setStatusBarBackgroundColor(color: UIColor) {
    
    guard let statusBar = UIApplication.shared.value(forKeyPath: "statusBarWindow.statusBar") as? UIView else { return }
    
    statusBar.backgroundColor = color
  }
 
  func fullScreenCamera(_ sender: Any) {
    if !isExpanded {
      //Expand the video
      UIView.animate(withDuration: 0.8, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
        self.videoPlayerSmallFrame = self.videoView.frame
        self.videoView.frame = CGRect(x: 0, y: 0, width: self.view.frame.height, height: self.view.frame.width)
        self.videoView.center = self.view.center
        self.videoView.transform = CGAffineTransform(rotationAngle: CGFloat(Double.pi / 2))
        self.videoView.layoutSubviews()
        self.windowGesture?.isEnabled = true
        self.videoViewGesture?.isEnabled = false
      }, completion: nil)
    } else {
      //Shrink the video again
      
      UIView.animate(withDuration: 0.8, delay: 0, usingSpringWithDamping: 1, initialSpringVelocity: 1, options: .curveEaseOut, animations: {
        
        //16 x 9 is the aspect ratio of all HD videos
        
        self.videoView.transform = CGAffineTransform.identity
        self.videoView.frame = self.videoPlayerSmallFrame
        self.videoView.layoutSubviews()
        self.windowGesture?.isEnabled = false;
        self.videoViewGesture?.isEnabled = true;
      }, completion: nil)
      
    }
    
    isExpanded = !isExpanded
  }
  
  @IBAction func backButtonClick(_ sender: Any) {
    print("back click")
    self.dismiss(animated: true, completion: nil)
  }
  
  @IBAction func settingButtonClick(_ sender: Any) {
    print("setting click")
  }
  
  fileprivate func reloadByCamera(cameraDic:Dictionary<String,Any>) -> Void{
    
    
    let roomId = cameraDic["room_id"] as! String
    //    let roomId = 4;
    let streamUrl = cameraDic["public_url"] as! String
    
    let tokenId = cameraDic["tokenId"] as! String
    
    
    ijkPlayer?.player.shutdown();
    ijkPlayer = IJKVideoViewController.init(url: URL(string: streamUrl))
    ijkPlayer?.view.frame = videoView.bounds
    
    videoViewGesture = UITapGestureRecognizer(target: self, action: #selector(self.fullScreenCamera(_:)))
    ijkPlayer?.view.addGestureRecognizer(videoViewGesture!)
    videoView.addSubview((ijkPlayer?.view)!)

    
    let url : String = "http://itdev.mobifone.vn/iSchoolService/rest/mobilews/v2/getSensorList?room_id=\(roomId)"
    let request : NSMutableURLRequest = NSMutableURLRequest()
    
    request.url = URL(string: url)
    request.httpMethod = "GET"
    request.addValue("Bearer \(tokenId)", forHTTPHeaderField: "Authorization")
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("application/json", forHTTPHeaderField:"Accept")
    
    let task = URLSession.shared.dataTask(with: request as URLRequest){ data, response, error in
      do{
        let jsonResult: NSDictionary! = try JSONSerialization.jsonObject(with: data!, options:JSONSerialization.ReadingOptions.mutableContainers) as? NSDictionary
        self.currentSensorList = (jsonResult["javaResponse"] as! Dictionary<String,Array<Any>>)["sensors"] as? Array<Dictionary<String, String>>;
        DispatchQueue.main.async {
          self.collectionView.reloadData()
        }
        
        print(jsonResult)
      } catch {
        print(error.localizedDescription)
      }
    }
    task.resume()
  }
  
  fileprivate func buildSampleItems() {
    
    
    let font = UIFont.systemFont(ofSize: 13)
    let boldFont = UIFont.boldSystemFont(ofSize: 13)
    let color = UIColor.gray
    let highlightedColor = UIColor.blue
    let selectedColor = UIColor.blue
    
    
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = .center
    paragraph.lineBreakMode = .byTruncatingTail
    if cameras !=  nil{
      for camera in cameras! {
        let cameraDic: Dictionary<String,Any> = camera as! Dictionary<String,Any>
        if let str = cameraDic["name"] as? String {
          let normalString = NSAttributedString.attributedString(str,
                                                                 font: font,
                                                                 color: color,
                                                                 paragraphStyle: paragraph)
          
          let highlightedAttributes = NSAttributedString.attributedString(str,
                                                                          font: font,
                                                                          color: highlightedColor,
                                                                          paragraphStyle: paragraph)
          
          let selectedAttributes = NSAttributedString.attributedString(str,
                                                                       font: boldFont,
                                                                       color: selectedColor,
                                                                       paragraphStyle: paragraph)
          
          let tabItem = USGScrollingTabItem()
          tabItem.normalString = normalString
          tabItem.highlightedString = highlightedAttributes
          tabItem.selectedString = selectedAttributes
          
          tabItems.append(tabItem)
        }
        
      }
      
    }
    
    
    
  }
}

extension SecondViewController: USGScrollingTabBarDelegate {
  
  
  func tabBar(_ tabBar: USGScrollingTabBar, didSelectTabAt index: Int) {
    print("tab \(index) selected")
    let camera = cameras?[index]
    
    let cameraDic: Dictionary<String,Any> = camera as! Dictionary<String,Any>
    reloadByCamera(cameraDic: cameraDic)
    

    
    
    
    //        scrollView.setContentOffset(CGPoint(x: scrollView.width * CGFloat(index), y: scrollView.contentOffset.y), animated: true)
  }
}

extension SecondViewController: UIScrollViewDelegate {
  func scrollViewDidScroll(_ scrollView: UIScrollView) {
    if (abs(_lastContentOffset.x - scrollView.contentOffset.x) > abs(_lastContentOffset.y - scrollView.contentOffset.y)) {
      scrollingTabBar.enabled = !scrollView.isTracking;
      
      if (scrollView.isTracking || scrollView.isDecelerating) {
        scrollingTabBar.scrollToOffset(scrollView.contentOffset.x)
      }
    }
  }
  
  func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
    //        scrollingTabBar.stopScrollDeceleration()
    _lastContentOffset = scrollView.contentOffset;
    scrollingTabBar.enabled = false
  }
  
  func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
    scrollingTabBar.enabled = true
    print(scrollView.contentOffset.x)
  }
  
}
extension SecondViewController: UICollectionViewDelegate, UICollectionViewDataSource{
  
  func numberOfSections(in collectionView: UICollectionView) -> Int {
    return 1
  }
  
  func collectionView(_ collectionView: UICollectionView,
                      numberOfItemsInSection section: Int) -> Int {
    return self.currentSensorList?.count ?? 0;
  }
  
  func collectionView(_ collectionView: UICollectionView,
                      cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: reuseIdentifier, for: indexPath) as! MainCell
    
    let sensor:Dictionary<String,String> = self.currentSensorList![indexPath.row]
          cell.mainView.layer.cornerRadius = 5
    let type = sensor["type"]
    let value = Float(sensor["data"]!) ?? 0
    
    switch type! {
    case "12":
      break
    case "263":
      break
    case "128":
            cell.lblType.text = "Nhiệt độ"
            cell.imageView.image = UIImage(named: "low-temperature")
            cell.lblValue.text = "\(value) °C"
      break
    case "129":
            cell.imageView.image = UIImage(named: "drop")
            cell.lblType.text = "Độ ẩm"
            cell.lblValue.text = "\(value) %"
      break
    case "160":
      break
      
    default:
      break
      
    }
    return cell
  }
}

extension SecondViewController: UICollectionViewDelegateFlowLayout{
  func collectionView(_ collectionView: UICollectionView,
                      layout collectionViewLayout: UICollectionViewLayout,
                      sizeForItemAt indexPath: IndexPath) -> CGSize {
    let availableWidth = view.frame.width
    print(availableWidth)
    let widthPerItem = (availableWidth - 20 ) / 3 - 10
    print(widthPerItem)
    
    return CGSize(width: widthPerItem, height: widthPerItem * 1.2 )
  }
  
  func collectionView(_ collectionView: UICollectionView,
                      layout collectionViewLayout: UICollectionViewLayout,
                      insetForSectionAt section: Int) -> UIEdgeInsets {
    return sectionInsets
  }
  
  func collectionView(_ collectionView: UICollectionView,
                      layout collectionViewLayout: UICollectionViewLayout,
                      minimumLineSpacingForSectionAt section: Int) -> CGFloat {
    return sectionInsets.left
  }
}
