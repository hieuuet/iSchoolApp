import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, Keyboard, Platform, TouchableOpacity } from "react-native";
import colors from '../../styles/colors';
import common from '../../styles/common';
import HeaderBack from "../../components/HeaderBack";
import SettingInput from '../../components/SettingInput';
import Util from '../../configs/util';
import Constant from '../../configs/constant';
import Api from '../../api/api';

const demo = [
    {
        title: 'Tên phụ huynh',
        state: 'name',
        editable : false
    },
    {
        title: 'Số điện thoại',
        state: 'phone',
        editable : false
    },
    {
        title: 'CMT/Hộ chiếu',
        state: 'idcard',
        editable : false
    },
    {
        title: 'Email',
        state: 'email'
    },
]

export default class Account extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isError: false,
            name: null,
            email: null,
            phone: null,
            idcard: null
        };
    }

    componentWillMount() {
        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.setState({
                name: userInfo.full_name,
                email: userInfo.email,
                phone: userInfo.phone_number,
                idcard: userInfo.id_card
            });
        });
    }

    onUpdateInfo = () => {
        if (!Util.isEmailValid(this.state.email)) {
            Util.showAlert('Địa chỉ email không đúng định dạng');
            return;
        }
        this.setState({loading : true, isError : false});
        var params = {
            email : this.state.email,
            address : ''
        }
        Api.updateUserInfo(params).then(res => {
            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                Util.getItem('SAVED_USERINFO', true).then(userInfo => {
                    userInfo.email = this.state.email.trim();
                    Util.setItem('SAVED_USERINFO', JSON.stringify(userInfo));
                    Util.showAlert('Cập nhật thông tin thành công');
                });
            } else {
                this.setState({loading : false, isError : true});
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    render() {

        return (
            <View style={common.body}>
                <HeaderBack title="Tài khoản" backgroundColor={colors.pink} onPressLeft={() => this.props.navigation.goBack()} />
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
                                  onChangeText={(text)=>this.setState({ [item.state]: text })}
                              />
                          )
                      })}
                    </View>
                    <TouchableOpacity onPress={this.onUpdateInfo} style={styles.btn}><Text style={styles.btnTxt}>CẬP NHẬT</Text></TouchableOpacity>
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
