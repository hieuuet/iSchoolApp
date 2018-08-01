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
} from "react-native";
import HeaderBack from "../../components/HeaderBack";
import EventDateBreak from "../../components/EventDateBreak";
import colors from '../../styles/colors';
import common from '../../styles/common';

export default class About extends React.Component {
    render() {
      const { navigation } = this.props;
    	return (
            <View style={common.body}>
                <HeaderBack title="Giới thiệu" backgroundColor={colors.pink} onPressLeft={() => this.props.navigation.goBack()} />
                <Image style={styles.logo} source={require('../../images/logo.png')} resizeMode="contain" />
                <ScrollView>
                    <Text style={styles.content}>
                        Giải pháp ứng dụng họcquản lý trường học thông minh giúp các bậc phụ huynh nắm được tình hình học tập của con cái, cập nhật nhanh chóng các tin tức, thông báo, sự kiện sắp diễn ra ở trường, lớp của con em.
                    </Text>
                    <EventDateBreak date={"Thông tin ứng dụng"} />
                    <View style={styles.form}>
                        <View style={styles.formInfo}>
                            <Text style={styles.title}>PHIÊN BẢN</Text>
                            <Text style={styles.info}>1.0</Text>
                        </View>
                        <View style={[styles.formInfo,{borderBottomWidth: 0}]}>
                            <Text style={styles.title}>CẬP NHẬT</Text>
                            <Text style={styles.info}>07/05/2018</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
		);
    }
}

const styles = StyleSheet.create({

    logo: {
        height: 140,
        marginVertical: 40,
        alignSelf: 'center'
    },
    form: {
        paddingVertical:10,
        marginHorizontal: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor:'rgba(0,0,0,0.05)',
        borderRadius: 7,
        backgroundColor:'white'
    },
    content: {
        fontSize: 17,
        color: "rgb(103,120,151)",
        marginHorizontal: 35,
        lineHeight: 25
    },
    title: {
        color: colors.pink,
        fontSize: 10,
        fontWeight: '800',
        marginTop: 5
    },
    formInfo: {
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255,255,255)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(219,219,221)'
    },
    info: {
        color: "rgb(2,37,72)",
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10
    }
});
