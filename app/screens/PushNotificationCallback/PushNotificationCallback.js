//@flow
import React, {Component} from "react";
import {View, Image, StatusBar, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, WebView, ScrollView, Platform } from "react-native";
import SmallPostItem from '../../components/SmallPostItem';
import Comment from '../../components/Comment';
import Tag from "../../components/Tag";
import common from '../../styles/common';
import styles from './styles';
import Util from '../../configs/util';
import Api from '../../api/api';
import _ from 'lodash';
import Constant from '../../configs/constant';
import dimens from '../../resources/dimens';
import colors from '../../resources/colors';
import PopupAudio from "../../components/PopupAudio";
import PopupTextContent from "../../components/PopupTextContent";

const win = Dimensions.get('window');


export default class PushNotificationCallback extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);

        this.state = {
            showPopupAudio: false,
            showPopupText: false,
            post: null
        };

        console.log(this.props.navigation.state.params.notification);
    }

    componentWillMount() {
        this.handleNotification(this.props.navigation.state.params.notification);
    }

    handleNotification = (notification) => {
        var type = '';
        var contentId = '';
        if (Platform.OS === 'ios') {
            type = notification.data.type;
            contentId = notification.data.content_id;
        } else {
            type = notification.type;
            contentId = notification.content_id;
        }
        var params = { id : contentId };

        if (type == '1') {
            Api.getNormalNewsFullDetail(params).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    this.props.navigation.navigate('PostDetail', {post : rs.javaResponse});
                }
            }).catch (error => {
                console.log(error);
            });

        } else if(type == '4') {
            Api.getRecordDetail(params).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    rs.javaResponse.publish_date = Util.diffDate(rs.javaResponse.publish_date, true);
                    this.showPopupAudio(rs.javaResponse);
                }
            }).catch (error => {
                console.log(error);
            });

        } else if(type == '2') {
            Api.getEventDetail(params).then(rs => {
                if (rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                    this.showPopupText(rs.javaResponse, true);
                }
            }).catch (error => {
                console.log(error);
            });

        } else if (type == '3') {
            Api.getNotificationDetail(params).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    this.showPopupText(rs.javaResponse, false);
                }
            }).catch (error => {
                console.log(error);
            });
        } else if (type == '5') {
            Api.getMessageDetail(params).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    this.showPopupText(rs.javaResponse, false);
                }
            }).catch (error => {
                console.log(error);
            });
        }
    }

    showPopupAudio = (post) => {
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
        this.props.navigation.goBack();
        // this.setState({
        //     animation: "fadeOutDownBig"
        //   },()=> {
        //     setTimeout (() => {
        //       this.setState({
        //         showPopupAudio: false,
        //         animationContainer: "zoomOut"
        //       })
        //     },200)
        //   })
    }

    showPopupText = (post, isEvent) => {
        this.setState({
            animationContainer: "zoomIn",
            showPopupText: true,
            post: post,
            isEvent : isEvent
        }, () => {
            setTimeout(()=>{
                this.setState({
                    animation: "fadeInUpBig"
                })
            })
        })
    }

    closePopupText = () => {
        this.props.navigation.goBack();
        // this.setState({
        //     animation: "fadeOutDownBig"
        //   },()=> {
        //     setTimeout (() => {
        //       this.setState({
        //         showPopupText: false,
        //         animationContainer: "zoomOut"
        //       })
        //     },200)
        //   })
    }

    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;

        return (
            <View style={common.body}>
                {this.state.showPopupAudio &&
                    <PopupAudio
                        animationContainer={this.state.animationContainer}
                        animation={this.state.animation}
                        closePopupAudio={this.closePopupAudio}
                        post={this.state.post}
                    />
                }
                {this.state.showPopupText &&
                    <PopupTextContent
                        animationContainer={this.state.animationContainer}
                        animation={this.state.animation}
                        closePopupText={this.closePopupText}
                        isEvent={this.state.isEvent}
                        post={this.state.post}
                    />
                }
			</View>
        );
    }
}
