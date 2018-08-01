import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    Platform,NativeModules,
    ToastAndroid,Alert
} from "react-native";
import PageHeaderLogo from "../../components/PageHeaderLogo";
import AnnouncementCard from "../../components/AnnouncementCard1";
import colors from '../../styles/colors';
import common from '../../styles/common';
import Api from '../../api/api';
import Util from '../../configs/util';
import _ from 'lodash';
import {connect} from 'react-redux';
import PlayCamera from '../../configs/playCamera';

class Utility extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            children : [],
            cameraList:''
        }
    }

    componentWillMount(){
        Util.getItem('SAVED_USERINFO',true).then((value) => {
            var class_id = value.children[this.props.childIndex].class_id;
            this.getCameraList(class_id);
            this.setState({
                children : value.children
            });
        });
    }

    onPressOpenCamera() {
        if(Platform.OS == 'ios'){
            if (this.state.cameraList == null || this.state.cameraList =="") {
                console.log("camera test" + this.state.cameraList);
            } else {
                NativeModules.SwiftComponentManager.iSchollDemo(this.state.cameraList);
            }
        } else if(Platform.OS =='android') {
            PlayCamera.show(this.state.cameraList, PlayCamera.SHORT);
        }
    }

    getCameraList = (class_id) => {
        Util.getItem('TOKEN').then(token =>{
            Api.getCameraList(class_id).then(rs => {
                let arrayListCamera = [];
                if(rs.code == 'SUCCESS'){
                    if(rs.javaResponse.cameras.length > 0) {
                        _.forEach(rs.javaResponse.cameras, function(val) {
                            val.tokenId = token;
                            arrayListCamera.push(val);
                        });
                        console.log("arrayListCamera"+JSON.stringify(rs.javaResponse));
                        this.setState({
                            cameraList: JSON.stringify(arrayListCamera)
                        });
                    }

                // }else {
                //     // c?n thÍm popup thÙng b·o khÙng cÛ camera
                //     this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }
    render() {
        const posts = [{
            subtitle: 'DỊCH VỤ',
            title: 'Học phí',
            cover: require('../../images/demo/hoc_phi.jpg'),
            desc: 'Ngừng'
        },
        {
            subtitle: 'DỊCH VỤ',
            title: 'Đưa đón',
            cover: require('../../images/demo/dua_don.jpg'),
            desc: 'Đang hoạt động'
        },
        {
            title: 'Giám sát Camera',
            desc: 'Đang hoạt động',
            cover: require('../../images/demo/camera.jpg'),
        },
        {
            subtitle: 'DỊCH VỤ',
            title: 'Sức khỏe',
            desc: 'Đang hoạt động',
            cover: require('../../images/demo/suc_khoe.jpg'),
        },
        {
            subtitle: 'TIỆN ÍCH',
            title: 'Dặn thuốc',
            desc: 'Đang hoạt động',
            cover: require('../../images/demo/dan_thuoc.jpg'),
        }];

     return (
            this.state.children.length > 0 &&
            <View style={common.body}>
                <PageHeaderLogo
                    logo={{uri:this.state.children[this.props.childIndex].school_logo}}
                    title={this.state.children[this.props.childIndex].school_name}
                    subTitle=''
                    address={this.state.children[this.props.childIndex].school_address}
                    backgroundColor={"rgba(0,165,255,0.9)"}
                    isScroll={true}
                />
                {/* <ScrollView>
                    <AnnouncementCard style={styles.fullCard} post={posts[2]}  onClick={() => this.onPressOpenCamera()} />
                </ScrollView> */}


                <ScrollView>
                    <View style={common.halfContainer}>
                        <AnnouncementCard style={common.halfCard} post={posts[0]} onClick={function(){ Alert.alert('Chức năng đang được phát triển'); }}/>
                        <AnnouncementCard style={common.halfCard} post={posts[1]} onClick={function(){ Alert.alert('Chức năng đang được phát triển'); }}/>
                    </View>
                    <View style={{paddingHorizontal: 15}}>
                    <AnnouncementCard style={styles.fullCard} post={posts[2]}  onClick={() => this.onPressOpenCamera()} />
                    </View>
                    <View style={common.halfContainer}>
                        <AnnouncementCard style={common.halfCard} post={posts[3]} onClick={function(){ Alert.alert('Chức năng đang được phát triển'); }}/>
                        <AnnouncementCard style={common.halfCard} post={posts[4]} onClick={function(){ Alert.alert('Chức năng đang được phát triển'); }}/>
                    </View>
                </ScrollView>




      </View>
  );
    }
}
function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, null)(Utility);

const styles = StyleSheet.create({
    fullCard: {
        height: Dimensions.get('window').width - 30
    }
});
