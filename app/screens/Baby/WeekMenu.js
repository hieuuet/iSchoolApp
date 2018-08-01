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
import Menu from '../../components/Menu';
import colors from '../../styles/colors';
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

class WeekMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menu : [],
            selectedDay: null,
            loading: false,
            isError : false
        };
    }

    componentWillMount(){
        this.getDailyMenu(true);
    }

    getDailyMenu = (showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }

        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            var class_id = userInfo.children[this.props.childIndex].class_id;
            var from_time = moment(this.props.fromDate).format('DD-MM-YYYY');
            var to_time = moment(this.props.toDate).format('DD-MM-YYYY');

            Api.getDailyMenu(class_id, from_time, to_time).then(res => {
                if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                    this.setState({loading: false, isError: res.javaResponse.menu.length == 0, children : userInfo.children, menu : res.javaResponse.menu});
                } else {
                    this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }

    onRefresh = () => {
        this.getDailyMenu(true);
    }

    onSelectDay(day) {
        LayoutAnimation.easeInEaseOut();
        this.setState({ selectedDay: day != this.state.selectedDay ? day : null })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingTop:5, backgroundColor: colors.body }}>
                {
                    (this.state.loading) && <View style={{height: 100}}><LoadingSpinner hasBackground={false}/></View>
                }
                {
                    (!this.state.loading && this.state.isError)
                    &&
                    <View style={{height: 100}}><EmptyMsg title={"Chưa có thực đơn"} onPress={this.onRefresh}/></View>
                }

                {
                    (!this.state.loading && !this.state.isError) &&
                    this.state.menu.map((item, index) => {
                        return (
                            <Menu
                                key={`${index}`}
                                menu={item}
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

export default connect(mapStateToProps, null)(WeekMenu);

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
