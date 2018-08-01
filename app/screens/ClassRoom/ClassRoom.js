import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet
} from "react-native";
import PageHeader from "../../components/PageHeader";
import PageHeaderLogo from "../../components/PageHeaderLogo";
import colors from '../../styles/colors';
import common from '../../styles/common';
import Tabs from 'react-native-tabs';
import TabTeacher from './TabTeacher';
import TabContact from './TabContact';
import TabMessage from './TabMessage';
import DefaultTabBar from './DefaultTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import Util from '../../configs/util';

class ClassRoom extends React.Component {
    static navigationOptions = {
        header: null
    };
    childrenTabs = [];

	constructor(props) {
		super(props);
        this.state = {
            page: '1',
            children : []
        };
    }

    componentWillMount() {
        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.setState({
                children : userInfo.children
            });
        });
    }

    handleChangeTab = ({i, ref, from}) => {
        this.setState({ tabIndex: i });
    }

    handleScroll = (scrollPosition) => {
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
                    backgroundColor={"rgba(255,147,0,0.9)"}
                    isScroll={true}
                />

                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    onChangeTab={this.handleChangeTab}
                    locked={false}
                    tabBarBackgroundColor={'#fff'}
                    tabBarActiveTextColor={colors.orange}
                    tabBarInactiveTextColor={'#686868'}
                    tabBarUnderlineStyle={styles.selectedTabStyle}
                    tabBarTextStyle={styles.tabLabel}
                    initialPage={0}>
                    <TabTeacher ref={(ref) => (this.childrenTabs[0] = ref)} navigation={this.props.navigation} handleScroll={this.handleScroll} tabLabel="Giáo viên"/>
                    <TabContact ref={(ref) => (this.childrenTabs[1] = ref)} navigation={this.props.navigation} handleScroll={this.handleScroll} tabLabel="Phụ huynh"/>
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

export default connect(mapStateToProps, null)(ClassRoom);

const styles = StyleSheet.create({

    tabheader: {
        backgroundColor: 'white',
        top: 130,
        height: 64,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
    },
    tabWrap: {
        marginTop: 64,
        marginBottom: 130
    },
    selectedTabStyle: {
        borderBottomWidth: 4,
        borderBottomColor: colors.orange
    },
    tabLabel: {
        fontSize: 14,
        paddingTop: 3
    }
});
