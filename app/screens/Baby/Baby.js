import React, {Component} from "react";
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    LayoutAnimation,
    FlatList,
    Platform,
    RefreshControl
} from "react-native";
import colors from '../../styles/colors';
import common from '../../styles/common';
import EventDateBreak from "../../components/EventDateBreak";
import PostCard from "../../components/PostCard";
import AnnouncementCard from "../../components/AnnouncementCard";
import TecherEvaluation from "../../components/TecherEvaluation";
import FeatureCard from "../../components/FeatureCard";
import Schedule from '../../components/Schedule';
import PopupConfirm from "../../components/PopupConfirm";
import ChildrenItem from "../../components/ChildrenItem";
import EmptyTabBar from "./EmptyTabBar";
import {connect} from 'react-redux';
import moment from 'moment';
import Api from '../../api/api';
import Constant from '../../configs/constant'
import Util from '../../configs/util'
import _ from 'lodash';
import * as actionCreators from '../../redux/actionCreators';
import RNRestart from 'react-native-restart';
import EmptyMsg from "../../components/EmptyMsg";
import LoadingSpinner from "../../components/LoadingSpinner";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Gallery from 'react-native-image-gallery';
import PushService from '../../configs/PushService';
import DeviceInfo from 'react-native-device-info';

class Baby extends React.Component {

    messagesHeight = {};

	constructor(props) {
		super(props);
        var today = new Date().getDay();
        var selectedDay = today == 0 ? today + 6 : today - 1;
        this.state = {
            children : [],
            messages : [],
            loading: false,
            isError : false,
            nextPage : 1,
            shouldLoadMore : true,
            sliderHeight: 180,
            currentTabIndex: 0,
            showGallery: false,
        };
    }

    componentWillMount(){
        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.setState({children : userInfo.children});

            var $this = this;
            if (userInfo.pass_default == 1) {
                Util.showAlert('Bạn vui lòng thay đổi mật khẩu mặc định để bảo mật tài khoản đăng nhập', function() {
                    $this.props.navigation.navigate('SettingPassword');
                });
            }
        });

        PushService.configure({
            onRegister : this._onRegister,
            onNotification : this._onNotification
        });

        this.getChildMessage(1, true);
    }

    _onRegister = (device) => {
        let params = {
            token: device.token,
            device_type: Platform.OS == "ios" ? 0 : 1,
            device_id: DeviceInfo.getUniqueID()
        };

        Api.insertToken(params).then(res => {}).catch (error => {});
    }

    _onNotification = (notification) => {
        var type = '';
        if (Platform.OS === 'ios') {
            type = notification.data.type;
        } else {
            type = notification.type;
        }


        if(notification.userInteraction) {
            if (typeof type != 'undefined') {
                this.props.navigation.navigate('PushNotificationCallback', {notification : notification});
            }
        } else {
            var msg = '';
            if (Platform.OS === 'ios') {
                msg = notification.message.body;
            } else {
                msg = notification.message;
            }
            Util.showNotification(notification.title, msg, () => {
                if (typeof type != 'undefined') {
                    this.props.navigation.navigate('PushNotificationCallback', {notification : notification});
                }
            });
        }
    }

    getChildMessage = (page, showRefresh) => {
        if (showRefresh) {
            if (page == 1) {
                this.setState({loading : true, isError : false, currentTabIndex: 0});
            } else {
                this.setState({loading : true, isError : false});
            }

        }

        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            var child_id = userInfo.children[this.props.childIndex].id;

            Api.getChildMessage(child_id, page).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    if(rs.javaResponse.messages.length > 0) {
                        let arrMessages = [];
                        _.forEach(rs.javaResponse.messages, function(val) {
                            val.create_date = Util.diffDate(val.create_date);
                            arrMessages.push(val);
                        });

                        if (page == 1) {
                            this.setState({
                                loading:false,
                                messages : arrMessages,
                                nextPage : page + 1,
                                shouldLoadMore : true,
                                isError : arrMessages.length == 0
                            });
                        } else {
                            var messages = [...this.state.messages, ...arrMessages];
                            this.setState({loading:false, messages : messages, nextPage : page + 1, shouldLoadMore : true, isError : false});
                        }
                    }else {
                        if (page == 1) {
                            this.setState({loading:false, messages : [], nextPage : 1, shouldLoadMore : false, isError : true});
                        } else {
                            this.setState({loading:false, shouldLoadMore : false, isError : false});
                        }
                    }
                }else {
                    this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }

    renderHeaderInfo = () => {
        return (
            this.state.children.length > 0 &&
            <View style={styles.header}>
                <View style={{flexDirection: "row", paddingHorizontal: 5, position:"absolute", top: 20, left: 0, right: 0, backgroundColor: "transparent"}} >
                    <View style={{flex:1}}/>
                    <View style={{flex:1}}/>
                    <TouchableOpacity onPress={() => {this.showPopup();}} style={{flex:1, justifyContent: "flex-end", flexDirection: "row", marginRight: 9}} >
                        <Image source={require("../../images/icon-menu.png")} style={{height: 24, width: 24, marginLeft: 9, tintColor: '#fff'}} resizeMode="cover" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.avaWrap]}><Image source={{uri: this.state.children[this.props.childIndex].profile_img}} resizeMode="cover" style={styles.ava} /></View>
                <Text style={styles.name}>{this.state.children[this.props.childIndex].children_name}</Text>
                <Text style={styles.desc}>{this.state.children[this.props.childIndex].class_name + " - " + this.state.children[this.props.childIndex].class_cate_name}</Text>
                <Text style={styles.desc}>{"Ngày sinh: " + Util.diffDate(this.state.children[this.props.childIndex].birthday, true)}</Text>
                <View style={styles.highlightHeader}>
                    <View style={{height:32, width:"100%", backgroundColor: "#fd4176"}}/>
                    <View style={{height:12, width:"100%", backgroundColor: 'white'}} />
                    <View style={{alignItems:'center' ,position: 'absolute', top: 0, bottom: 0 }}>
                        <View style={{height: 20, width: 2, backgroundColor:'white'}} />
                        <View style={styles.pointHeader}/>
                    </View>
                </View>
            </View>
        )
    }

  showPopup = () => {
    this.setState({
        showPopup: true,
        animation: "fadeInUpBig",
    })
  }

  closePopup = () => {
      this.setState({
          animation: "fadeOutDownBig"
        },()=> {
          setTimeout (() => {
            this.setState({
              showPopup: false,
            })
          },200)
        })
  }

  retrieveNextPage = () => {
      if (this.state.shouldLoadMore) {
          this.getChildMessage(this.state.nextPage, false);
      }
  }

  _onRefresh = () => {
      this.getChildMessage(1, true);
  }

  handleChangeTab = ({i, ref, from}) => {
      if (i == this.state.messages.length - 1) {
          this.retrieveNextPage();
      }

      setTimeout(()=>{
          LayoutAnimation.easeInEaseOut();
          this.setState({currentTabIndex : i, sliderHeight : this.messagesHeight['i_' + i] + 30 });
      }, 500);
  }

  showGallery = () => this.setState({ showGallery: true })

  hideGallery = () => this.setState({ showGallery: false })

  renderItem = ({item, index}) => {
      return (
          <TecherEvaluation
              onLayout={(event) => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  this.messagesHeight['i_' + index] = height;
                  LayoutAnimation.easeInEaseOut();
                  this.setState({ sliderHeight : height + 30 });
              }}
              key={index.toString()}
              isFirst={true}
              isLast={true}
              isMiddle={true}
              data={{
                  user: item.create_user_name,
                  avatar: item.create_user_avatar,
                  mail: '',
                  time: item.create_date,
                  isNew: true,
                  message: item.content
              }} />
      );
  }

    render() {

        const posts = [{
            name: 'Cô Hường',
            username: 'huongnd',
            time: '16m',
            content: 'Hôm nay con ăn ngoan, ngủ đủ giấc. Tham gia các hoạt động với các bạn rất vui',
            avatar: 'https://www.ufv.ca/media/assets/programs/background-images/TEP-Teacher-education-program-177096614-web.jpg',
        }];

        const features = [{
            subtitle: 'GIÁO CỤ',
            title: 'Thời khoá biểu',
            cover: 'https://i.pinimg.com/736x/c8/1e/96/c81e969bddc3fd049d03929c6b31ffcd--screen-wallpaper-iphone--wallpaper.jpg',
            desc: 'Thứ 2'
        },
        {
            subtitle: 'GIÁO CỤ',
            title: 'Bảng điểm',
            cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
            desc: 'Học kỳ 2'
        }];

    	return (
            <View style={{height: '100%'}}>
                <ScrollView
                    style={common.body}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefresh}
                            colors={['#EA0000']}
                            tintColor="#848484"
                            title="Đang tải..."
                            titleColor="#848484"
                            progressBackgroundColor="white" />
                    }>
        			{this.renderHeaderInfo()}

                    <View style={styles.halfContainer}>
                        <FeatureCard style={[styles.fullCard, {marginRight: 5}]}
                            cover={require('../../images/demo/schedule.png')}
                            subtitle="Xem chi tiết"
                            title="Thời khóa biểu"
                            desc={""}
                            onPress={() => this.props.navigation.navigate('BabySchedule')}
                        />
                        <FeatureCard style={[styles.fullCard, {marginLeft: 5}]}
                           cover={require('../../images/demo/child_menu.png')}
                            subtitle="Xem chi tiết"
                            title="Thực đơn"
                            desc={""}
                            onPress={() => this.props.navigation.navigate('BabyMenu')}
                        />
                    </View>
                    {
                        (this.state.loading) && <View style={{height: 100}}><LoadingSpinner hasBackground={false}/></View>
                    }
                    {
                        this.state.isError
                        &&
                        <View style={{height: 100}}><EmptyMsg title={"Không có tin nhắn"} onPress={this._onRefresh}/></View>
                    }

                    {
                        (!this.state.loading && !this.state.isError) &&
                        <View style={{height: this.state.sliderHeight}}>
                            <ScrollableTabView
                                locked={false}
                                onChangeTab={this.handleChangeTab}
                                renderTabBar={() => <EmptyTabBar />}
                                initialPage={this.state.currentTabIndex}>
                                {
                                    this.state.messages.map((item, index) => {
                                        return this.renderItem({item, index});
                                    })
                                }

                            </ScrollableTabView>
                        </View>
                    }

                    <View style={[styles.galleryHeader, common.cardShadow]}>
                        <Text style={styles.galleryTitle}>Ảnh 20, th.2, 2018</Text>
                        <Text style={styles.gallerySubtitle}>6 photos</Text>
                    </View>
                    <View style={[styles.galleryContent]}>
                        <TouchableOpacity onPress={this.showGallery} style={styles.galleryImageWrap}><Image source={{ uri: features[0].cover }} resizeMode="cover" style={styles.galleryImage} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.showGallery} style={styles.galleryImageWrap}><Image source={{ uri: features[1].cover }} resizeMode="cover" style={styles.galleryImage} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.showGallery} style={styles.galleryImageWrap}><Image source={{ uri: features[0].cover }} resizeMode="cover" style={styles.galleryImage} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.showGallery} style={styles.galleryImageWrap}><Image source={{ uri: features[1].cover }} resizeMode="cover" style={styles.galleryImage} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.showGallery} style={styles.galleryImageWrap}><Image source={{ uri: features[0].cover }} resizeMode="cover" style={styles.galleryImage} /></TouchableOpacity>
                        <TouchableOpacity onPress={this.showGallery} style={styles.galleryImageWrap}><Image source={{ uri: features[0].cover }} resizeMode="cover" style={styles.galleryImage} /></TouchableOpacity>
                    </View>



        		</ScrollView>
                {
                    this.state.showPopup &&
                    <PopupConfirm
                        animation={this.state.animation}
                        closePopup={this.closePopup}
                        onPress={this.state.popupType == 'logout' ? this.logout : this.updateApp}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{ color: 'black', fontSize: 16, opacity: 0.5, marginVertical: 10}}>Danh sách con</Text>
                            {
                                this.state.children.map((child, index) => {
                                    return (
                                        <ChildrenItem key={index.toString()} onPress={() => {
                                            Util.setItem('SAVED_CHILD_INDEX', index + '').then(() => {
                                                RNRestart.Restart();
                                            });
                                        }} avater={{uri: child.profile_img}} name={child.children_name} age={child.class_name} />
                                    )
                                })
                            }
                        </View>
                    </PopupConfirm>
                }
                {this.state.showGallery &&
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, backgroundColor: 'black' }}>
                        <TouchableOpacity onPress={this.hideGallery} style={{ position: 'absolute', top: 10, left: 10, padding: 10, zIndex: 100}}>
                            <Text style={{color: 'white', fontSize: 40, fontWeight: '500', opacity: 0.8}}>
                                ×
                            </Text>
                        </TouchableOpacity>
                        <Gallery
                            style={{ flex: 1, backgroundColor: 'black' }}
                            images={[
                            { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                            { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                            { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                            { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                            ]}
                        />
                    </View>
                }
            </View>
		);
    }
}

function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, actionCreators)(Baby);

const styles = StyleSheet.create({
    selectedTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: '#fd4176'
    },
    tabLabel: {
        fontSize: 14,
        paddingTop: 10,
        textAlign: 'center'
    },
    header: {
        paddingTop: 35,
        backgroundColor: '#fd4176',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 22,
        letterSpacing: 0.3,
        color: 'white',
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 6
    },
    desc: {
        color: 'white',
        fontSize: 15
    },
    avaWrap: {
        width: 90,
        height: 90,
        overflow: 'hidden',
        borderRadius: 90,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        marginRight: 10,
        position: 'relative',
        borderWidth: 2,
        borderColor: '#fff'
    },
    ava: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    avaFriend: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "white",
        resizeMode: 'cover',
    },
    avaContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginLeft: -7,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    halfCard: {
        width: Dimensions.get('window').width/2-22.5,
        height: Dimensions.get('window').width/2-22.5,
    },
    fullCard: {
        flex: 1
    },
    halfContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 15
    },
    galleryHeader: {
        backgroundColor: 'white',
        height: 70,
        paddingLeft: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    galleryTitle: {
        fontWeight: '500',
        fontSize: 17
    },
    gallerySubtitle: {
        color: '#999999',
        fontSize: 13
    },
    galleryContent: {
        margin: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    galleryImage: {
        width: (Dimensions.get('window').width - 60)/3,
        height: (Dimensions.get('window').width - 60)/3,
    },
    galleryImageWrap: {
        marginBottom: 15,
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.08)',
        borderRadius: 2
    },
    highlightHeader: {
        height: 44,
        width: "100%",
        alignItems:'center',
        marginTop:10
    },
    pointHeader: {
        height: 24,
        width: 24,
        backgroundColor: "#fd4176",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "white"
    }
});
