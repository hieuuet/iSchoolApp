import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, Keyboard, Platform, TouchableOpacity } from "react-native";
import colors from '../../styles/colors';
import common from '../../styles/common';
import HeaderBack from "../../components/HeaderBack";
import SettingInput from '../../components/SettingInput';
import Util from '../../configs/util';
import Constant from '../../configs/constant';
import Api from '../../api/api';
import _ from 'lodash';
import MD5 from 'crypto-js/md5';

const demo = [
    {
        title: 'Nhập lại mật khẩu cũ',
        placeholder: '*******',
        state: 'oldPass',
        security: true,
    },
    {
        title: 'Mật khẩu mới',
        placeholder: '-',
        state: 'newPass',
        security: true,
    },
    {
        title: 'Nhập lại mật khẩu mới',
        placeholder: '-',
        state: 'newPassConfirm',
        security: true,
    },
]

export default class Account extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isError: false,
            oldPass: '',
            newPass: '',
            newPassConfirm: '',
        };
    }

    changePassword = () => {
        if (_.isEmpty(this.state.oldPass)) {
            Util.showAlert('Vui lòng nhập mật khẩu cũ');
            return;
        }
        if (_.isEmpty(this.state.newPass)) {
            Util.showAlert('Vui lòng nhập mật khẩu mới');
            return;
        }
        if (_.isEmpty(this.state.newPassConfirm)) {
            Util.showAlert('Vui lòng nhập lại mật khẩu mới để xác nhận');
            return;
        }
        if (this.state.newPass != this.state.newPassConfirm) {
            Util.showAlert('Nhập lại mật khẩu mới chưa chính xác');
            return;
        }
        this.setState({loading : true, isError : false});
        var params = {
            old_password : MD5(this.state.oldPass),
            new_password : MD5(this.state.newPass)
        }
        Api.changePassword(params).then(res => {
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                var $this = this;
                Util.showAlert('Thay đổi mật khẩu thành công. Bạn vui lòng đăng nhập lại', function () {
                    Util.clearAll();
                    $this.props.navigation.navigate('Login');
                });
                this.setState({loading : false, isError : true, oldPass: '', newPass: '', newPassConfirm: '',});
            } else {
                this.setState({loading : false, isError : true});
                Util.showAlert(res.msg);
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    render() {
        return (
            <View style={common.body}>
                <HeaderBack title="Mật khẩu" backgroundColor={"rgb(162,55,243)"} onPressLeft={() => this.props.navigation.goBack()} />
                <ScrollView style={{ padding: 20, paddingBottom: 0 }} keyboardShouldPersistTaps="always">
                    <View style={{paddingVertical:10, borderWidth: 1, borderColor:'rgba(0,0,0,0.05)', borderRadius: 7, backgroundColor:'white'}}>
                        {demo.map((item, index) => {
                            return (
                                <SettingInput
                                    key={index}
                                    index={index}
                                    item={item}
                                    style={{borderBottomWidth: index === demo.length - 1 ? 0 : 1}}
                                    value={this.state[item.state]}
                                    onChangeText={(text) => this.setState({ [item.state]: text })}
                                />
                            )
                        })}
                    </View>
                    <TouchableOpacity onPress={this.changePassword} style={styles.btn}><Text style={styles.btnTxt}>CẬP NHẬT</Text></TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 155,
        height: 50,
        backgroundColor: colors.pink,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        shadowColor: colors.pink,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    btnTxt: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    },
});
