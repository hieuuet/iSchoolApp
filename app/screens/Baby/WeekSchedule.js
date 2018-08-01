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
import Schedule from '../../components/Schedule';
import colors from '../../styles/colors';
import HeaderBack from "../../components/HeaderBack";
import EventDateBreak from "../../components/EventDateBreak";
import Api from '../../api/api';
import Constant from '../../configs/constant';
import Util from '../../configs/util';
import LoadingSpinner from '../../components/LoadingSpinner';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import EmptyMsg from "../../components/EmptyMsg";

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

class WeekSchedule extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            schedules : [[], [], [], [], [], [], []],
            emptySchedule : false,
            selectedDay: null,
            loading: false,
            isError : false
        };
    }

    componentWillMount(){
        this.getScheduleList(true);
    }

    getScheduleList = (showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }

        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            var class_id = userInfo.children[this.props.childIndex].class_id;
            var from_date = moment(this.props.fromDate).format('DD-MM-YYYY');
            var to_date = moment(this.props.toDate).format('DD-MM-YYYY');

            Api.getScheduleList(class_id, from_date, to_date).then(res => {
                if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                    var emptySchedule = true;
                    for (var i=0; i<res.javaResponse.schedules.length; i++) {
                        if (res.javaResponse.schedules[i].length > 0) {
                            emptySchedule = false;
                            break;
                        }
                    }
                    this.setState({loading: false, isError: emptySchedule, children : userInfo.children, schedules : res.javaResponse.schedules, emptySchedule : emptySchedule});
                } else {
                    this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }

    onRefresh = () => {
        this.getScheduleList(true);
    }

    onSelectDay(day) {
        LayoutAnimation.easeInEaseOut();
        this.setState({ selectedDay: day != this.state.selectedDay ? day : null })
    }

    render() {
        var weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        return (
            <ScrollView style={{ flex: 1, paddingTop:5, backgroundColor: colors.body }}>
                {
                    (this.state.loading) && <View style={{height: 100}}><LoadingSpinner hasBackground={false}/></View>
                }
                {
                    this.state.isError
                    &&
                    <View style={{height: 100}}><EmptyMsg title={"Chưa có thời khóa biểu"} onPress={this.onRefresh}/></View>
                }

                {
                    (!this.state.loading && !this.state.isError && !this.state.emptySchedule) &&
                    this.state.schedules.map((item, index) => {
                        return (
                            <Schedule
                                key={`scd_${index}`}
                                day={weekdays[index]}
                                subjects={item}
                                selected={this.state.selectedDay == index}
                                onPress={() => this.onSelectDay(index)}
                            />
                        )
                    })
                }
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, null)(WeekSchedule);

const styles = StyleSheet.create({
    selectedTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: colors.green
    },
    tabLabel: {
        fontSize: 14,
        paddingTop: 10
    }
});
