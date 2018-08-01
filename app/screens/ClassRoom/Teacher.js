import React, { Component, PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, Linking, TouchableOpacity } from "react-native";
import colors from '../../styles/colors';
import common from '../../styles/common';
import HeaderBack from '../../components/HeaderBack';
import Util from '../../configs/util'

export default class Teacher extends PureComponent {
    static navigationOptions = {
        title: 'Giáo viên',
        headerStyle: {
            backgroundColor: colors.orange,
            borderWidth: 0,
            borderColor: colors.orange
        },
        headerTintColor: '#fff',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let teacher = this.props.navigation.state.params.teacher;
        return (
            <View style={{flex: 1}}>
                <HeaderBack
                    backgroundColor={colors.orange}
                    title={""}
                    iconRight={null}
                    onPressLeft={()=>this.props.navigation.goBack()}
                />
                <View style = { styles.header }>
                    <View style = { styles.avaWrap }>
                        <Image style = { styles.ava } resizeMode = "cover" source = { { uri: teacher.profile_img } }/>
                    </View>
                    <Text style = { styles.title } >{teacher.teacher_name}</Text>
                    <Text style = { styles.subtitle } >{(teacher.is_master == 1 ? "Giáo viên chủ nhiệm" : "Giáo viên bộ môn")}</Text>
                </View>
                <ScrollView>
                    <View style={[common.cardShadow,styles.card]}>
                        <Text style={styles.cardTopTitle}>THÔNG TIN CÁ NHÂN</Text>
                        <View style={styles.infoItem}>
                            <Text style={styles.cardPara}>Địa chỉ</Text>
                            <Text style={[styles.cardSubtitle]}>{teacher.address}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.cardPara}>Ngày sinh</Text>
                            <Text style={[styles.cardSubtitle]}>{Util.diffDate(teacher.birthday, true)}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.cardPara}>Số điện thoại</Text>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL("tel:"+teacher.phone);
                            }}>
                                <Text style={[styles.cardSubtitle, {color: colors.orange}]}>{teacher.phone}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.cardPara}>Bộ môn</Text>
                            <Text style={[styles.cardSubtitle]}>{teacher.subject_name}</Text>
                        </View>
                    </View>
                    <View style={[common.cardShadow,styles.card,{marginTop: 0}]}>
                        <Text style={styles.cardTopTitle}>KINH NGHIỆM</Text>
                        <Text style={styles.description}>{teacher.description}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 140,
        backgroundColor: colors.orange,
        flexDirection: 'column',
        alignItems: 'center'
    },
    avaWrap: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 90,
        overflow: 'hidden'
    },
    ava: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 22,
        color: '#fff',
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 15,
        color: '#fff'
    },
    card: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 8,
        padding: 20
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    cardPara: {
        color: 'black',
        fontSize: 14,
        marginBottom: 2
    },
    cardSubtitle: {
        fontSize: 14,
        maxWidth: 250,
        textAlign: 'right'
    },
    cardTopTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
        color: colors.orange
    },
    cardDivider: {
        borderTopWidth: 1,
        borderTopColor: '#d8d8d8',
        marginVertical: 15
    },
    description : {
        fontSize: 14,
        lineHeight: 30
    }
});
