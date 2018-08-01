import React, { Component, PureComponent} from 'react';
import {View, ScrollView, Text, AsyncStorage, FlatList, RefreshControl, TouchableWithoutFeedback, Image, TextInput, TouchableOpacity, Keyboard } from "react-native";
import PostCard from "../../components/PostCard";
import Api from '../../api/api';
import Constant from '../../configs/constant'
import Util from '../../configs/util'
import LoadingSpinner from '../../components/LoadingSpinner'
import _ from 'lodash';
import {connect} from 'react-redux';
import EmptyMsg from "../../components/EmptyMsg";
import colors from '../../styles/colors';

class TabClass extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            loading: false,
            isError : false,
            nextPage : 1,
            shouldLoadMore : true,
            inputSearching : false,
            inputSearchingQuery : ''
        };
        this.currentScrollPosition = 0;
        this._onRefresh = this._onRefresh.bind(this);
        this.textInputSearch = null;
    }

    componentWillMount(){
        this.getListLatestNews(1, true);
    }

    getListLatestNews = (page, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }

        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            var class_id = userInfo.children[this.props.childIndex].class_id;
            var params = {
                class_id: class_id,
                page: page,
                query: this.state.inputSearchingQuery.trim()
            };

            Api.getLatestNews(params).then(rs => {
                if (rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                    if (rs.javaResponse.news.length > 0) {
                        let arrNews = [];
                        _.forEach(rs.javaResponse.news, function(val) {
                            val.cover = val.img;
                            val.publish_date = Util.diffDate(val.publish_date);
                            arrNews.push(val);
                        });

                        if (page == 1) {
                            this.setState({loading:false, news : arrNews, nextPage : page + 1, shouldLoadMore : true, isError : arrNews.length == 0});
                        } else {
                            var news = [...this.state.news, ...arrNews];
                            this.setState({loading:false, news : news, nextPage : page + 1, shouldLoadMore : true, isError : false});
                        }
                    } else {
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

    gotoDetail = (item) => {
        console.log('KIENND '+JSON.stringify(item));
        this.props.navigation.navigate('PostDetail', {post : item});
    }

    retrieveNextPage = () => {
        if (this.state.shouldLoadMore) {
            this.getListLatestNews(this.state.nextPage, false);
        }
    }

    _onRefresh() {
        this.getListLatestNews(1, true);
	}

    renderItem(item) {
        return (
            <PostCard
                post={item}
                gotoDetail={()=>this.gotoDetail(item)}
                onLike={() => {
                    var newsArr = [...this.state.news];
                    for (var i=0; i<newsArr.length; i++) {
                        var n = newsArr[i];
                        if (n.id == item.id) {
                            n.n_like = n.liked == 1 ? Number.parseInt(n.n_like, 10) - 1 : Number.parseInt(n.n_like, 10) + 1;
                            n.liked = n.liked == 1 ? 0 : 1;
                            this.setState({news:newsArr});
                            break;
                        }
                    }

                    Api.likeNews(item.id).then(res => {
                        if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                        } else {
                            Util.showAlert(res.msg);
                        }
                    }).catch (error => {
                        Util.showAlert(Constant.MESSAGES.EXCEPTION);
                    });
                }} />
        );
    }

	render() {
        let filterNews = [];

        for (var i=0; i<this.state.news.length; i++) {
            if (this.state.news[i].type == this.props.filterType || this.props.filterType == 0) {
                filterNews.push(this.state.news[i]);
            }
        }
        let isError = this.state.isError || filterNews.length == 0;

        var { handleScroll } = this.props;
		return (
            <View style={{height: '100%'}}>
                {
                    this.state.loading && <LoadingSpinner hasBackground={false}/>
                }
                {
                    isError && !this.state.loading
                    &&
                    <EmptyMsg title={"Không có bản tin"} onPress={this._onRefresh}/>
                }
                <View style={{alignItems:'center', justifyContent: 'center', position: 'absolute', bottom: 30, right: 30, zIndex: 100000, width: 50, height: 50, backgroundColor: colors.green, borderRadius: 100}}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.showPopupFilter();
                    }}>
                        <View style={{width: 50, height: 50, alignItems:'center', justifyContent: 'center'}}>
                            <Image style={{width: 20, height: 20, tintColor: '#fff', top: 2}} source={require('../../images/filter.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
                                    this.getListLatestNews(1, true);
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
                            this.getListLatestNews(1, true);
                            this.setState({inputSearching : false});
                        }}>
                        <Image source={require("../../images/searchwhite.png")} style={{width: 20, height: 20, tintColor : colors.green}} />
                    </TouchableOpacity>
                </View>
                {
                    (!this.state.loading && !isError) &&
                    <FlatList
                        onScroll={(event) => {
                            handleScroll(event.nativeEvent.contentOffset.y);
                            this.currentScrollPosition = event.nativeEvent.contentOffset.y;
                        }}
                        data={filterNews}
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

export default connect(mapStateToProps, null)(TabClass);
