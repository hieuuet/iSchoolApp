import React, {Component} from "react";
import {
    Platform,
    Linking,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import PopupConfirm from '../../components/PopupConfirm';
import PageHeaderLogo from "../../components/PageHeaderLogo";
import SettingForm from "../../components/SettingForm";
import colors from '../../styles/colors';
import common from '../../styles/common';
import Util from '../../configs/util';
import Api from '../../api/api';
import Constant from '../../configs/constant';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

class Setting extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            children : [],
            currentVersion : DeviceInfo.getVersion(),
            configs : null,
        }
    }

    componentWillMount(){
        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.setState({
                children : userInfo.children
            });
        });
    }

    onClickLogOut = () => {
        var $this = this;

        Util.showConfirm(Constant.MESSAGES.CONFIRM_LOGOUT_TITLE, function() {
            Util.clearAll();
            $this.props.navigation.navigate('Login');
        });
    }

    showPopup = async () => {
        let configs = await Api.getAppConfigs();
        if (typeof configs != 'undefined' && configs.code == 'SUCCESS') {
            this.setState({
                showPopup: true,
                animation: "fadeInUpBig",
                configs : configs.javaResponse
            });
            Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
        } else {
            Util.showAlert('Không kiểm tra được phiên bản ứng dụng. Vui lòng thử lại sau');
        }
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

    updateApp = async () => {
        if (this.state.configs.version != this.state.currentVersion) {
            let appUrl = Platform.select({
                ios: this.state.configs.ios_url,
                android: this.state.configs.android_url
            });
            Linking.openURL(appUrl);
        } else {
            this.closePopup();
        }
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
                    backgroundColor={"rgba(161,66,239,0.9)"}
                    isScroll={true}
                />
                <ScrollView style={{flex: 1}}>
                    <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
                        <SettingForm onPress={()=> this.props.navigation.navigate('SettingAccount')} title={"Tài khoản"} icon={require("../../images/setting/profile.png")} />
                        <SettingForm onPress={()=> this.props.navigation.navigate('SettingPassword')} title={"Đổi mật khẩu"} icon={require("../../images/setting/password.png")} />
                    </View>
                    <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
                        <SettingForm onPress={()=> this.props.navigation.navigate('About')} title={"Giới thiệu"} icon={require("../../images/setting/intro.png")} />
                        <SettingForm onPress={()=> {this.showPopup();}} title={"Cập nhật App"} icon={require("../../images/setting/update.png")} />
                    </View>
                    <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
                        <SettingForm onPress={this.onClickLogOut} title={"Đăng xuất"} icon={require("../../images/setting/logout.png")} />
                    </View>
                </ScrollView>
                {this.state.showPopup &&
                    <PopupConfirm
                        txtActivePopup={this.state.configs != null && this.state.configs.version == this.state.currentVersion ? 'ĐÓNG' : 'CẬP NHẬT'}
                        animation={this.state.animation}
                        closePopup={this.closePopup}
                        onPress={this.updateApp}
                    >
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{ color: 'black', fontSize: 16, opacity: 0.5, marginVertical: 10}}>
                                Phiên bản hiện tại {this.state.currentVersion}
                            </Text>
                            <Text style={{ textAlign:'center', color: colors.pink, fontSize: 20, fontWeight: "600" , marginVertical: 10}}>
                                {this.state.configs != null && this.state.configs.version == this.state.currentVersion ? 'Bạn đang sử dụng phiên bản mới nhất' : 'Phiên bản mới nhất ' + this.state.configs.version}
                            </Text>
                        </View>
                    </PopupConfirm>
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

export default connect(mapStateToProps, null)(Setting);

const styles = StyleSheet.create({

});
