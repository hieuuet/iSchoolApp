import React, {Component} from "react";
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Dimensions
} from "react-native";

import colors from '../../styles/colors';
import common from '../../styles/common';
import DeviceInfo from 'react-native-device-info';
import Api from '../../api/api';
import Constant from '../../configs/constant';
import Util from '../../configs/util';
import MD5 from 'crypto-js/md5';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';
import LoadingSpinner from '../../components/LoadingSpinner';

class Login extends React.Component {
    static navigationOptions = {
        header: null
    };

	constructor(props) {
		super(props);
        this.state = {
            loading : false,
            username: '',
			password: ''
        };
    }

    _submitLogin = () => {
        var auth = {
            deviceType : (Platform.OS === 'ios') ? 0 : 1,
            deviceModel: DeviceInfo.getModel(),
            deviceVersion: DeviceInfo.getSystemVersion(),
            devicePlatform: Platform.OS,
            deviceId: DeviceInfo.getUniqueID(),
            username: this.state.username,
            password: MD5(this.state.password)
        };

        this.setState({loading : true});
        Api.checkLogin(auth).then(rs => {
            this.setState({loading : false});
            const { navigate } = this.props.navigation;

            if (rs.code === 'SUCCESS') {
                let userInfor = rs.javaResponse;
                Util.setItem('SAVED_USERINFO', JSON.stringify(userInfor)).then(() => {
                    if (userInfor.children.length > 0) {
                        Util.setItem('SAVED_CHILD_INDEX', '0');
                        this.props.changechildIndexAction(0);
                    }
                    this.props.navigation.navigate('Main');
                });

            } else {
                Util.handleDefaultResponse(rs, navigate);
                if (rs.code === 'INCORRECT_AUTHEN') {
                    Util.showAlert(rs.msg);
                }
            }
        }).catch (error => {
            this.setState({loading : false});
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    _login() {
        if(_.isEmpty(this.state.username)) {
            Util.showAlert('Chưa nhập số điện thoại. Vui lòng kiểm tra lại');
            return;
        }
        if(_.isEmpty(this.state.password)) {
            Util.showAlert('Chưa nhập mật khẩu. Vui lòng kiểm tra lại');
            return;
        }

        Util.getItem('TOKEN').then(token => {
            if (!token) {
                var deviceId = DeviceInfo.getUniqueID();
                Api.getAuthToken(deviceId).then(res => {
                    if (res.code !== 'SUCCESS') {
                        Util.exitApp();
                    } else {
                        this._submitLogin();
                    }
                }).catch(error => {
                   Util.exitApp();
                });
            } else {
                this._submitLogin();
            }
        });
    }

    _forgetPassword() {
        Util.getItem('TOKEN').then(token => {
            if (!token) {
                var deviceId = DeviceInfo.getUniqueID();
                Api.getAuthToken(deviceId).then(res => {
                    if (res.code !== 'SUCCESS') {
                        Util.exitApp();
                    } else {
                        this.props.navigation.navigate('Register')
                    }
                }).catch(error => {
                   Util.exitApp();
                });
            } else {
                this.props.navigation.navigate('Register')
            }
        });
    }

    render() {
        const { navigation } = this.props;

    	return (
            <View style={[common.body, styles.body]}>
                {
                    this.state.loading && <LoadingSpinner hasBackground={true}/>
                }
                <ScrollView>
        			<Image style={styles.logo} source={require('../../images/logo.png')} resizeMode="contain" />
                    <View style={[common.cardShadow, styles.inputWrap]}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.input}
                            placeholder={'TÊN ĐĂNG NHẬP'}
                            value={this.state.username}
                            onChangeText={ username => this.setState({username})}
                            maxLength={14}

                        />
                        <Image style={styles.inputIcon} source={require('../../images/user.png')} resizeMode="contain" />
                    </View>
                    <View style={[common.cardShadow, styles.inputWrap]}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            style={[styles.input,{marginTop: 0}]}
                            placeholder={'MẬT KHẨU'}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                        <Image style={styles.inputIcon} source={require('../../images/pass.png')} resizeMode="contain" />
                    </View>
                    <TouchableOpacity onPress={()=>this._login()} style={styles.btn}><Text style={styles.btnTxt}>Đăng nhập</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._forgetPassword()} style={styles.forgotPassWrap}><Text style={styles.forgotPass}>Quên mật khẩu?</Text></TouchableOpacity>
        		</ScrollView>
                <Image style={styles.bg} source={require('../../images/bg-pattern.png')} resizeMode="contain" />
            </View>
		);
    }
}

export default connect(null, actionCreators)(Login);

const styles = StyleSheet.create({
    body: {

    },
    logo: {
        height: 120,
        marginVertical: 40,
        alignSelf: 'center'
    },
    btn: {
        width: 180,
        height: 50,
        backgroundColor: '#73c700',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,

    },
    btnTxt: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14
    },
    forgotPass: {
        fontWeight: '500',
        color: '#2d3e4f',
        fontSize: 15,
        textAlign: 'center'
    },
    forgotPassWrap: {
        marginTop: Dimensions.get('window').height - 550
    },
    bg: {
        zIndex: -1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '60%',
        width: '100%'
    },
    input: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 60,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    inputWrap: {
        height: 60,
        position: 'relative',
        backgroundColor: 'white',
        margin: 5,
        marginHorizontal: 20
    },
    inputIcon: {
        width:24,
        height:24,
        position: 'absolute',
        right: 18,
        top: 18
    },

});
