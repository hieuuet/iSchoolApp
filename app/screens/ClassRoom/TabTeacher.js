import React, { Component, PureComponent} from 'react';
import {ScrollView, View, FlatList, RefreshControl} from "react-native";
import InfoCard from "../../components/InfoCard";
import LoadingSpinner from '../../components/LoadingSpinner';
import Constant from '../../configs/constant'
import Api from '../../api/api';
import Util from '../../configs/util';
import _ from 'lodash';
import {connect} from 'react-redux';
import EmptyMsg from "../../components/EmptyMsg";

class TabTeacher extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            loading: false,
            isError: false
        };
    }

    componentWillMount(){
        this.getListTeacher(true);
    }

    _onRefresh = () => {
        this.getListTeacher(true);
    }

    getListTeacher = (showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }

        Util.getItem('SAVED_USERINFO',true).then((value) => {
            var class_id = value.children[this.props.childIndex].class_id;

            Api.getTeachersListOfClass(class_id).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    let arrTeachers = [];
                    _.forEach(rs.javaResponse.teachers, function(val) {
                        arrTeachers.push(val);
                    });
                    this.setState({
                        loading:false,
                        teachers : arrTeachers,
                        isError : arrTeachers.length == 0
                    });
                }else {
                    this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }

    renderItem = (item) => {
        const { navigation } = this.props;
        return <InfoCard
                    onPress={() => navigation.navigate('Teacher', {teacher : item})}
                    title={item.teacher_name}
                    subtitle={(item.is_master == 1 ? "Chủ nhiệm" : "Bộ môn") + " - " + item.subject_name}
                    subject={item.subject_name}
                    isMaster={item.is_master == 1}
                    thumb={item.profile_img} />
    }

    onRefresh = () => {
        this.getListTeacher(true);
    }

    render() {
		return (
            <View style={{height: '100%'}}>
                {
                    this.state.loading && <LoadingSpinner hasBackground={false}/>
                }
                {
                    this.state.isError
                    &&
                    <EmptyMsg title={"Không có thông tin giáo viên"} onPress={this._onRefresh}/>
                }
                {
                    (!this.state.loading && !this.state.isError) &&
                    <FlatList
                        data={this.state.teachers}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.01}
                        shouldItemUpdate={ (props,nextProps) => { return props.item.id !== nextProps.item.id } }
                        initialNumToRender={3}
                        removeClippedSubviews={true}
                        refreshControl={
        					<RefreshControl
        						refreshing={false}
        						onRefresh={this.onRefresh}
        						colors={['#EA0000']}
        						tintColor="#848484"
        						title="Đang tải..."
        						titleColor="#848484"
        						progressBackgroundColor="white" />
        				} />
                }
            </View>
        );
	}
}

function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, null)(TabTeacher);
