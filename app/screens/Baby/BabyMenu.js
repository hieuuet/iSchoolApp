import React, { Component, PureComponent } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    UIManager,
    LayoutAnimation,
    ScrollView
} from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import colors from '../../styles/colors';
import HeaderBack from "../../components/HeaderBack";
import Api from '../../api/api';
import Constant from '../../configs/constant';
import Util from '../../configs/util';
import LoadingSpinner from '../../components/LoadingSpinner';
import WeekMenu from './WeekMenu';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

class BabyMenu extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            menus : [],
            selectedDay: null,
            loading: false,
            isError : false
        };
    }

    onSelectDay(day) {
        LayoutAnimation.easeInEaseOut();
        this.setState({ selectedDay: day != this.state.selectedDay ? day : null })
    }

    render() {
        var weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        return (
            <View style={{ flex: 1 }} tabLabel="Tin tức" navigation={this.props.navigation}>
                <HeaderBack
                    backgroundColor={'#fd4176'}
                    title={"Thực đơn"}
                    onPressLeft={()=>this.props.navigation.goBack()} />
                <ScrollableTabView
                    locked={false}
                    tabBarBackgroundColor={'#fff'}
                    tabBarActiveTextColor={'#fd4176'}
                    tabBarInactiveTextColor={'#686868'}
                    tabBarUnderlineStyle={styles.selectedTabStyle}
                    tabBarTextStyle={styles.tabLabel}
                    initialPage={0}>
                    <WeekMenu
                        fromDate={Util.getMondayOfTheWeek(moment().add(0, 'weeks').toDate())}
                        toDate={Util.getSundayOfTheWeek(moment().add(0, 'weeks').toDate())}
                        tabLabel={"Tuần này\n("+moment(Util.getMondayOfTheWeek(moment().add(0, 'weeks').toDate())).format('DD/MM/YYYY')+" - "+moment(Util.getSundayOfTheWeek(moment().add(0, 'weeks').toDate())).format('DD/MM/YYYY')+")"} />
                    <WeekMenu
                        fromDate={Util.getMondayOfTheWeek(moment().add(1, 'weeks').toDate())}
                        toDate={Util.getSundayOfTheWeek(moment().add(1, 'weeks').toDate())}
                        tabLabel={"Tuần tới\n("+moment(Util.getMondayOfTheWeek(moment().add(1, 'weeks').toDate())).format('DD/MM/YYYY')+" - "+moment(Util.getSundayOfTheWeek(moment().add(1, 'weeks').toDate())).format('DD/MM/YYYY')+")"} />

                </ScrollableTabView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, null)(BabyMenu);

const styles = StyleSheet.create({
    selectedTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: '#fd4176'
    },
    tabLabel: {
        fontSize: 14,
        paddingTop: 10,
        textAlign: 'center'
    }
});
