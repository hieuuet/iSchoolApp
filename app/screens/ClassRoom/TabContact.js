import React, { Component, PureComponent} from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, RefreshControl} from "react-native";
import InfoCard from "../../components/InfoCard";
import ContactCard from "../../components/ContactCard";
import common from '../../styles/common';
import colors from '../../styles/colors';
import Constant from '../../configs/constant'
import Api from '../../api/api';
import Util from '../../configs/util';
import _ from 'lodash';
import {connect} from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyMsg from "../../components/EmptyMsg";

class TabContact extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            parents: [],
            loading: false,
            isError: false
        };
    }

    componentWillMount(){
        this.getListParent(true);
    }

    _onRefresh = () => {
        this.getListParent(true);
    }

    getListParent = (showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }

        Util.getItem('SAVED_USERINFO',true).then((value) => {
            var class_id = value.children[this.props.childIndex].class_id;

            Api.getListParentsOfClass(class_id).then(rs => {
                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    let arrParents = [];
                    _.forEach(rs.javaResponse.parents, function(val) {
                        arrParents.push(val);
                    });

                    this.setState({
                        loading:false,
                        parents : arrParents,
                        isError : arrParents.length == 0
                    });
                } else {
                    this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }

    renderItem = (item) => {
        const { navigation } = this.props;
        return <ContactCard phone={item.phone} title={item.title + " " + item.children_name} subtitle={item.name + " - " + item.phone} thumb={item.avatar} showarrow={false} />
    }

    onRefresh = () => {
        this.getListParent(true);
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
                    <EmptyMsg title={"Không có thông tin phụ huynh"} onPress={this._onRefresh}/>
                }
                {
                    (!this.state.loading && !this.state.isError) &&
                    <FlatList
                        data={this.state.parents}
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

export default connect(mapStateToProps, null)(TabContact);

const styles = StyleSheet.create({
    dividerTitle: {
        paddingVertical: 8,
        color: colors.gray,
        paddingLeft: 15,
        backgroundColor: '#fff',
        marginTop: 15
    }
});
