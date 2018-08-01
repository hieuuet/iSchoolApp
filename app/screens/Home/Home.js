import React, {Component, PureComponent} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    LayoutAnimation,
    Platform,
    TouchableOpacity
} from "react-native";
import PageHeader from "../../components/PageHeader";
import PageHeader_Bottom from "../../components/PageHeader_Bottom";
import PageHeaderLogo from "../../components/PageHeaderLogo";

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabEvent from './TabEvent';
import TabClass from './TabClass';
import TabAnnouncement from './TabAnnouncement';
import AppStateComponent from "../../components/AppStateComponent";
import EventDateBreak from "../../components/EventDateBreak";
import PopupAudio from "../../components/PopupAudio";
import PopupConfirm from '../../components/PopupConfirm';

import colors from '../../styles/colors';
import common from '../../styles/common';
import Constant from '../../configs/constant';
import {connect} from 'react-redux';
import Util from '../../configs/util';
import Api from '../../api/api';
class Home extends PureComponent {
    static navigationOptions = {
        header: null
    };

    children = [];

	constructor(props) {
		super(props);

		this.state = { currentTime: null, currentDay: null }
		this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

		this.state = {
            children : [],
            page: 'class',
            tabIndex: 0,
            scrollPosition : 0,
            showPopupAudio: false,
            showPopupFilter: false,
            post: null,
            filterType: 0   // 0: Tất cả, 1: Tin truong, 2: Tin Khoi, 3: Tin Lop
		};
	}

    componentWillMount() {
        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.setState({
                children : userInfo.children
            });
        });

    }

    handleChangeTab = ({i, ref, from}) => {
        if (this.children[i].currentScrollPosition >= Constant.SCROLL_THRESHOLD && this.state.scrollPosition < Constant.SCROLL_THRESHOLD) {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                tabIndex: i,
                scrollPosition : this.children[i].currentScrollPosition
            });
        } else if (this.children[i].currentScrollPosition < Constant.SCROLL_THRESHOLD && this.state.scrollPosition >= Constant.SCROLL_THRESHOLD) {
            LayoutAnimation.easeInEaseOut();
            this.setState({
                tabIndex: i,
                scrollPosition : this.children[i].currentScrollPosition
            });
        } else {
            this.setState({
                tabIndex: i
            });
        }
    }

    handleScroll = (scrollPosition) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({scrollPosition});
    }

    showPopupAudio = (post) => {
        console.log('KIENND '+JSON.stringify(post));
        this.setState({
            animationContainer: "zoomIn",
            showPopupAudio: true,
            post: post
        }, () => {
            setTimeout(()=>{
                this.setState({
                    animation: "fadeInUpBig"
                })
            })
        })
    }

    closePopupAudio = () => {
        this.setState({
            animation: "fadeOutDownBig"
          },()=> {
            setTimeout (() => {
              this.setState({
                showPopupAudio: false,
                animationContainer: "zoomOut"
              })
            },200)
          })
    }

    showPopupFilter = () => {
        this.setState({
            showPopupFilter: true,
            animation: "fadeInUpBig"
        });
    }

    closePopupFilter = () => {
        this.setState({
            animation: "fadeOutDownBig"
          },()=> {
            setTimeout (() => {
              this.setState({
                showPopupFilter: false,
              })
            },200)
          })
    }

    render() {
    	return (
            this.state.children.length > 0 &&
			<View style={common.body}>
                <PageHeaderLogo
                    logo={{uri:this.state.children[this.props.childIndex].school_logo}}
                    title={this.state.children[this.props.childIndex].school_name}
                    subTitle=''
                    address={this.state.children[this.props.childIndex].school_address}
                    backgroundColor={"rgba(118,197,36,0.9)"}
                    isScroll={this.state.scrollPosition > Constant.SCROLL_THRESHOLD}
                />
                <ScrollableTabView
                    onChangeTab={this.handleChangeTab}
                    locked={false}
                    tabBarBackgroundColor={'#fff'}
                    tabBarActiveTextColor={colors.green}
                    tabBarInactiveTextColor={'#686868'}
                    tabBarUnderlineStyle={styles.selectedTabStyle}
                    tabBarTextStyle={styles.tabLabel}
                    initialPage={0}>
                    <TabClass
                        ref={(ref) => (this.children[0] = ref)}
                        tabLabel="Tin tức"
                        navigation={this.props.navigation}
                        handleScroll={this.handleScroll}
                        showPopupFilter={this.showPopupFilter}
                        filterType={this.state.filterType} />
                    <TabAnnouncement
                        ref={(ref) => (this.children[1] = ref)}
                        tabLabel="Thông báo" navigation={this.props.navigation}
                        handleScroll={this.handleScroll}
                        showPopupAudio={this.showPopupAudio} />
                    <TabEvent
                        ref={(ref) => (this.children[2] = ref)}
                        tabLabel="Sự kiện"
                        navigation={this.props.navigation}
                        handleScroll={this.handleScroll}
                        showPopupFilter={this.showPopupFilter}
                        filterType={this.state.filterType} />
                </ScrollableTabView>
                {this.state.showPopupAudio &&
                    <PopupAudio
                        animationContainer={this.state.animationContainer}
                        animation={this.state.animation}
                        closePopupAudio={this.closePopupAudio}
                        post={this.state.post}
                    />
                }
                {this.state.showPopupFilter &&
                    <PopupConfirm
                        animation={this.state.animation}
                        closePopup={this.closePopupFilter} >
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{ color: 'black', fontSize: 16, opacity: 0.5, marginVertical: 10}}>Lọc tin tức, thông báo, sự kiện</Text>
                            <TouchableOpacity onPress={() => {this.setState({filterType:0}); this.closePopupFilter();}} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <View style={{flex: 1, marginLeft: 15, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomColor: "rgb(221,221,224)", borderBottomWidth: 1}}>
                                  <View style={{flex: 1}}>
                                      <Text style={styles.name}>
                                        Tất cả
                                      </Text>
                                  </View>
                                  <Image style={{width: 28, height: 28,}} source={require("../../images/arrowRight.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({filterType:3}); this.closePopupFilter();}} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <View style={{flex: 1, marginLeft: 15, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomColor: "rgb(221,221,224)", borderBottomWidth: 1}}>
                                  <View style={{flex: 1}}>
                                      <Text style={styles.name}>
                                        {this.state.children[this.props.childIndex].class_name}
                                      </Text>
                                  </View>
                                  <Image style={{width: 28, height: 28,}} source={require("../../images/arrowRight.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({filterType:2}); this.closePopupFilter();}} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <View style={{flex: 1, marginLeft: 15, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomColor: "rgb(221,221,224)", borderBottomWidth: 1}}>
                                  <View style={{flex: 1}}>
                                      <Text style={styles.name}>
                                        {this.state.children[this.props.childIndex].class_cate_name}
                                      </Text>
                                  </View>
                                  <Image style={{width: 28, height: 28,}} source={require("../../images/arrowRight.png")} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.setState({filterType:1}); this.closePopupFilter();}} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <View style={{flex: 1, marginLeft: 15, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomColor: "rgb(221,221,224)", borderBottomWidth: 1}}>
                                  <View style={{flex: 1}}>
                                      <Text style={styles.name}>
                                        {this.state.children[this.props.childIndex].school_name}
                                      </Text>
                                  </View>
                                  <Image style={{width: 28, height: 28,}} source={require("../../images/arrowRight.png")} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </PopupConfirm>
                }

                <AppStateComponent />
			</View>
		);
    }
}

function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    selectedTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: colors.green
    },
    tabLabel: {
        fontSize: 14,
        paddingTop: 10
    },
    name: {
      color: 'black',
      fontSize: 21
    },
    age: {
      color: 'black',
      fontSize: 15,
      opacity: 0.5,
      marginTop: 2
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30
    }
});
