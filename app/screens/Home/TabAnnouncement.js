import React, { Component, PureComponent} from 'react';
import { ScrollView, Text, StyleSheet, AsyncStorage, FlatList, RefreshControl, View, Dimensions, TextInput, TouchableOpacity, Image, Keyboard } from "react-native";
import AnnouncementCard from "../../components/AnnouncementCard";
import LoadingSpinner from '../../components/LoadingSpinner'
import Constant from '../../configs/constant'
import Api from '../../api/api';
import Util from '../../configs/util';
import _ from 'lodash';
import {connect} from 'react-redux';
import EmptyMsg from "../../components/EmptyMsg";
import colors from '../../styles/colors';

class TabAnnouncement extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            loading: false,
            isError: false,
            nextPage : 1,
            shouldLoadMore : true,
            inputSearching : false,
            inputSearchingQuery : ''
        };
        this.currentScrollPosition = 0;
        this._onRefresh = this._onRefresh.bind(this);
        this.textInputSearch = null;
    }
    componentDidMount(){
        this.getLatestNotifications(1, true);
    }
    _onRefresh() {
        this.getLatestNotifications(1, true);
	}

    getLatestNotifications = (page, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }
        Util.getItem('SAVED_USERINFO',true).then((value) => {
            var class_id = value.children[this.props.childIndex].class_id;
            var params = {
                class_id: class_id,
                page: page,
                query: this.state.inputSearchingQuery
            };
            Api.getLatestNotifications(params).then(rs => {

                if(rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS){
                    if(rs.javaResponse.notifications.length > 0) {
                        let arrNotificationNews = [];
                        _.forEach(rs.javaResponse.notifications, function(val) {
                            val.publish_date = Util.diffDate(val.publish_date, true);
                            val.cover = 'https://www.babble.com/wp-content/uploads/2014/08/wwerwer.jpg',
                            arrNotificationNews.push(val);
                        });

                        if (page == 1) {
                            this.setState({loading:false, news : arrNotificationNews, nextPage : page + 1, shouldLoadMore : true, isError : arrNotificationNews.length == 0});
                        } else {
                            var news = [...this.state.news, ...arrNotificationNews];
                            this.setState({loading:false, news : news, nextPage : page + 1, shouldLoadMore : true, isError : false});
                        }
                    }else{
                        if (page == 1) {
                            this.setState({loading:false, news : [], nextPage : 1, shouldLoadMore : false, isError : true});
                        } else {
                            this.setState({loading:false, shouldLoadMore : false, isError : false});
                        }
                    }
                } else {
                    this.setState({loading : false, isError : true});
                }
            }).catch (error => {
                this.setState({loading : false, isError : true});
            });
        });
    }

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            this.getLatestNotifications(this.state.nextPage, false);
        }
    }

    renderItem(item, index) {
        return (
            <AnnouncementCard showPopupAudio={this.props.showPopupAudio} style={{marginVertical: 15}} post={item} />
        );
    }

	render() {
        var { handleScroll } = this.props;

        return (
            <View style={{height: '100%'}}>
                {
                    this.state.loading && <LoadingSpinner hasBackground={false}/>
                }
                {
                    this.state.isError
                    &&
                    <EmptyMsg title={"Không có thông báo"} onPress={this._onRefresh}/>
                }
                <View style={[{ zIndex: 10000, height: 50, width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 10}]}>
                    <View style={{flex:1, padding: 5 }}>
                        <View style={{
                          borderRadius: 4,
                          backgroundColor: "#F0F0F0",
                          flex: 1
                        }}>
                            <TextInput
                                ref={input => { this.textInputSearch = input }}
                                underlineColorAndroid="transparent"
                                placeholder="Tìm kiếm"
                                style={{ width: "100%", height: "100%", paddingLeft: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5}}
                                onChangeText={text => {
                                    this.setState({
                                        inputSearchingQuery : text,
                                        inputSearching : true
                                    });
                                }} />
                        </View>
                    </View>
                    {
                        (this.state.inputSearchingQuery.trim() != '') &&
                        <TouchableOpacity style={{
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 15
                            }} onPress={() => {
                                this.textInputSearch.clear();
                                this.textInputSearch.blur();
                                if (!this.state.inputSearching) {
                                    this.getLatestNotifications(1, true);
                                }
                                this.setState({
                                    inputSearchingQuery : '',
                                    inputSearching : false
                                });
                            }}>
                            <Image source={require("../../images/close_gray.png")} style={{width: 20, height: 20, tintColor : colors.green}} />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 15
                        }} onPress={() => {
                            Keyboard.dismiss();
                            this.getLatestNotifications(1, true);
                            this.setState({inputSearching : false});
                        }}>
                        <Image source={require("../../images/searchwhite.png")} style={{width: 20, height: 20, tintColor : colors.green}} />
                    </TouchableOpacity>
                </View>
                {
                    (!this.state.loading && !this.state.isError) &&
                    <FlatList
                        onScroll={(event) => {
                            handleScroll(event.nativeEvent.contentOffset.y);
                            this.currentScrollPosition = event.nativeEvent.contentOffset.y;
                        }}
                        data={this.state.news}
                        scrollEnabled={this.props.scrollEnabled}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.retrieveNextPage}
                        onEndReachedThreshold={0.01}
                        shouldItemUpdate={ (props,nextProps) => { return props.item.id !== nextProps.item.id } }
                        initialNumToRender={3}
                        removeClippedSubviews={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this._onRefresh}
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

export default connect(mapStateToProps, null)(TabAnnouncement);

const styles = StyleSheet.create({
    card: {margin: 15}
});
