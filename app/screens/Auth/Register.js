import React, {Component} from "react";
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform
} from "react-native";

import colors from '../../styles/colors';
import common from '../../styles/common';
import HeaderBack from '../../components/HeaderBack';
import LoadingSpinner from '../../components/LoadingSpinner';
import Api from '../../api/api';
import Constant from '../../configs/constant';
import Util from '../../configs/util';
import MD5 from 'crypto-js/md5';
import _ from 'lodash';

class Register extends React.Component {
    static navigationOptions = {
        header: null
    };

	constructor(props) {
		super(props);
        this.state = {
            enterPasswordStep: false,
            username: '',
            otp: '',
            password: '',
            confirmPassword: ''
        };
    }

    getOtp = () => {
        if (_.isEmpty(this.state.username.trim())) {
            Util.showAlert('Vui lòng nhập tên đăng nhập');
            return;
        }

        this.setState({loading : true});
        Api.getOtp(this.state.username.trim()).then(rs => {
            if (rs.code === 'SUCCESS') {
                this.setState({loading : false, enterPasswordStep : true});
            } else {
                this.setState({loading : false, enterPasswordStep : false});
                const { navigate } = this.props.navigation;
                Util.handleDefaultResponse(rs, navigate);
                if (rs.code === 'USER_NOT_FOUND') {
                    Util.showAlert(rs.msg);
                }
            }
        }).catch (error => {
            this.setState({loading : false});
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    verifyOtp = () => {
        if (_.isEmpty(this.state.password)) {
            Util.showAlert('Vui lòng nhập mật khẩu mới');
            return;
        }
        if (_.isEmpty(this.state.confirmPassword)) {
            Util.showAlert('Vui lòng nhập lại mật khẩu mới để xác nhận');
            return;
        }
        if (_.isEmpty(this.state.otp.trim())) {
            Util.showAlert('Vui lòng nhập mã xác thực. Mã xác thực đã được gửi đến thuê bao điện thoại của bạn');
            return;
        }
        if (this.state.password != this.state.confirmPassword) {
            Util.showAlert('Nhập lại mật khẩu mới chưa chính xác');
            return;
        }

        this.setState({loading : true});
        Api.verifyOtp(this.state.username.trim(), this.state.otp.trim(), MD5(this.state.password)).then(rs => {
            var $this = this;
            const { navigate } = this.props.navigation;

            if (rs.code === 'SUCCESS') {
                this.setState({loading : false, enterPasswordStep : true});
                Util.showAlert('Thay đổi mật khẩu thành công', function() {
                    $this.props.navigation.goBack()
                });
            } else {
                this.setState({loading : false, enterPasswordStep : true});
                Util.handleDefaultResponse(rs, navigate);
                if (rs.code === 'MAX_TRY' ||
                    rs.code === 'WRONG_OTP' ||
                    rs.code === 'OTP_NOT_FOUND' ||
                    rs.code === 'OTP_TIMEOUT'
                ) {
                    Util.showAlert(rs.msg);
                }
            }
        }).catch (error => {
            this.setState({loading : false});
            Util.showAlert(Constant.MESSAGES.EXCEPTION);
        });
    }

    render() {
        const { navigation } = this.props;
        var instruction = this.state.enterPasswordStep ? 'Xin mời nhập mật khẩu mới và mã xác thực được gửi đến thuê bao di động của bạn' : 'Xin mời nhập tên tài khoản đăng ký để nhận mật khẩu mới';
    	return (
        <View style={[common.body, styles.body]}>
          { this.state.loading && <LoadingSpinner hasBackground={true}/> }
          <HeaderBack
              backgroundColor={colors.green}
              title={"Quên mật khẩu"}
              onPressLeft={()=>this.props.navigation.goBack()}
          />
          <View style={{alignItems: 'center', marginTop: 30}} >
            <View style={{padding: 10, borderWidth: 1.5, borderColor: colors.green, borderRadius: 54}}>
              <View style={{alignItems: 'center', justifyContent: 'center', width: 86, height: 86, borderRadius: 43, backgroundColor: colors.green}}>
                <Image style={styles.logo} source={require('../../images/lockScreenRotation.png')} resizeMode="contain" />
              </View>
            </View>
            <Text style={{ marginVertical: 20, marginHorizontal: 40, fontSize: 16, color: "rgb(45,62,79)", textAlign: 'center'}}>
                {instruction}
            </Text>
            {
                !this.state.enterPasswordStep &&
                <View style={[common.cardShadow, styles.inputWrap]}>
                  <TextInput
                      style={styles.input}
                      placeholder={'TÊN ĐĂNG NHẬP'}
                      value={this.state.username}
                      onChangeText={ username => this.setState({username})}
                      maxLength={14}
                      underlineColorAndroid={"transparent"}
                  />
                  <Image style={styles.inputIcon} source={require('../../images/user.png')} resizeMode="contain" />
                </View>
            }
            {
                this.state.enterPasswordStep &&
                <View style={[common.cardShadow, styles.inputWrap]}>
                    <TextInput
                        secureTextEntry={true}
                        style={[styles.input,{marginTop: 0}]}
                        placeholder={'MẬT KHẨU MỚI'}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <Image style={styles.inputIcon} source={require('../../images/pass.png')} resizeMode="contain" />
                </View>
            }
            {
                this.state.enterPasswordStep &&
                <View style={[common.cardShadow, styles.inputWrap]}>
                    <TextInput
                        secureTextEntry={true}
                        style={[styles.input,{marginTop: 0}]}
                        placeholder={'XÁC NHẬN LẠI MẬT KHẨU MỚI'}
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        value={this.state.confirmPassword}
                    />
                    <Image style={styles.inputIcon} source={require('../../images/pass.png')} resizeMode="contain" />
                </View>
            }
            {
                this.state.enterPasswordStep &&
                <View style={[common.cardShadow, styles.inputWrap]}>
                    <TextInput
                        secureTextEntry={false}
                        style={[styles.input,{marginTop: 0}]}
                        placeholder={'MÃ XÁC THỰC'}
                        onChangeText={(otp) => this.setState({otp})}
                        value={this.state.otp}
                    />
                    <Image style={styles.inputIcon} source={require('../../images/pass.png')} resizeMode="contain" />
                </View>
            }
            {
                !this.state.enterPasswordStep &&
                <TouchableOpacity onPress={this.getOtp} style={styles.btn}><Text style={styles.btnTxt}>Gửi yêu cầu</Text></TouchableOpacity>
            }
            {
                this.state.enterPasswordStep &&
                <TouchableOpacity onPress={this.verifyOtp} style={styles.btn}><Text style={styles.btnTxt}>Đổi mật khẩu</Text></TouchableOpacity>
            }
          </View>
          <Image style={styles.bg} source={require('../../images/bg-pattern.png')} resizeMode="contain" />
        </View>
		);
    }
}

export default Register;

const styles = StyleSheet.create({
    logo: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
    btn: {
        width: 155,
        height: 50,
        backgroundColor: '#73c700',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    btnTxt: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14
    },
    forgotPass: {
        fontWeight: '500',
        color: '#2d3e4f',
        fontSize: 15
    },
    forgotPassWrap: {
        position: 'absolute',
        left: '50%',
        bottom: 30,
        width: 120,
        marginLeft: -60
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
        margin: 15,
        marginVertical:5,
        width: "90%"
    },
    inputIcon: {
        width:24,
        height:24,
        position: 'absolute',
        right: 18,
        top: 18
    }
});
