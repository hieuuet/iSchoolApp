import React, { Component, PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, Keyboard } from "react-native";
import colors from '../../styles/colors';
import common from '../../styles/common';
import HeaderBack from '../../components/HeaderBack';
import PostDetailInfo from '../../components/PostDetailInfo';
import ConversationItem from '../../components/ConversationItem';
import EventDateBreak from '../../components/EventDateBreak';
import PostCard from "../../components/PostCard";
import InputChat from '../../components/InputChat';
import Api from '../../api/api';
import Constant from '../../configs/constant'
import Util from '../../configs/util'
import LoadingSpinner from '../../components/LoadingSpinner'
import _ from 'lodash';
import moment from 'moment';
import HTML from 'react-native-render-html';

export default class PostDetail extends Component {
    comment = '';

    constructor(props) {
        super(props);
        this.state = {
            newsDetail: this.props.navigation.state.params.post,
            loading: false,
            isError : false
        };
        this.userInfo = null;
    }

    componentWillMount () {
        this.getNewsDetail(this.state.newsDetail.id, true);

        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.userInfo = userInfo;
        });
    }

    getNewsDetail = (id, showRefresh) => {
        if (showRefresh) {
            this.setState({loading : true, isError : false});
        }
        Api.getNormalNewsDetail(id).then(rs => {
            if (rs.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                this.setState({newsDetail: {...this.state.newsDetail, ...rs.javaResponse}, loading : false, isError : false}, () => {
                });
            } else {
                this.setState({loading : false, isError : true});
            }
        }).catch (error => {
            this.setState({loading : false, isError : true});
        });
    }

    renderInput = () => {
        return (
            <InputChat
                ref="mInputChat"
                tintColor={colors.green}
                onChangeText={text => {
                    this.comment = text;
                }}
                onPress={() => {
                    if (this.comment.trim() == '') {
                        Util.showAlert('Vui lòng nhập nội dung bình luận');
                        return;
                    }
                    Keyboard.dismiss();
                    let newsDetail = {...this.state.newsDetail};
                    let comments = newsDetail.comments;
                    comments.splice(0,0, {
                        time : moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        name : this.userInfo.full_name,
                        username: this.userInfo.username,
                        content : this.comment,
                        img_url : this.userInfo.img_url
                    });
                    newsDetail.comments = comments;
                    this.setState({newsDetail});
                    this.refs.mScrollView.scrollTo({x:0, y:this.scrollHeight,animated: true});

                    var params = {
                        news_id : this.state.newsDetail.id,
                        content : this.comment
                    };
                    this.refs.mInputChat.clear();
                    this.comment = '';

                    Api.commentNews(params).then(res => {
                        if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                        } else {
                            Util.showAlert(res.msg);
                        }
                    }).catch (error => {
                        Util.showAlert(Constant.MESSAGES.EXCEPTION);
                    });
                }} />
        )
    }

    render() {
        let newsDetail = {...this.state.newsDetail};
        let comments = [];
        if (newsDetail.comments != null) {
            comments = newsDetail.comments.map(cmt => {
                return <ConversationItem
                            key={cmt.id}
                            data={{
                                user: cmt.name,
                                avatar: cmt.img_url,
                                mail: cmt.username,
                                time: Util.diffDate(cmt.time),
                                message: cmt.content
                            }}
                            onPress={() => null} />;
            });
        }

        return (
            <View style={{flex: 1}}>
                <HeaderBack
                    backgroundColor={colors.green}
                    title={""}
                    onPressLeft={()=>this.props.navigation.goBack()}
                />
                <ScrollView ref="mScrollView" style={{flex: 1}}>
                    <View onLayout={(event) => {
                        var {x, y, width, height} = event.nativeEvent.layout;
                        this.scrollHeight = height;
                    }}>
                        <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
                            <View>
                                <Text style={styles.name}>{newsDetail.title}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.username}>@{newsDetail.publish_name}</Text>
                                <Text style={styles.time}>{newsDetail.publish_date}</Text>
                            </View>
                        </View>
                        <Text style={styles.content}>{newsDetail.short_description}</Text>
                        {
                            this.state.loading && <View style={{height: 100}}><LoadingSpinner hasBackground={false}/></View>
                        }
                        {
                            newsDetail.full_description != null &&
                            <View style={{ paddingHorizontal: 15 }}>
                                <HTML
                                    html={newsDetail.full_description}
                                    baseFontStyle={{fontSize:16, color: '#333'}}
                                    imagesMaxWidth={Dimensions.get('window').width * 0.92}
                                    tagsStyles={{ p: { marginTop: 5, marginBottom: 5 }}}
                                    ignoredStyles={['display','width','height','margin','padding']} />
                            </View>
                        }
                        {
                            !this.state.loading &&
                            <View style={styles.commentWrap}>
                                <View style={styles.socialButtonWrap}>
                                    <TouchableOpacity style={styles.socialButton} onPress={() => {
                                        var n_like = newsDetail.liked == 1  ? Number.parseInt(newsDetail.n_like, 10) - 1 : Number.parseInt(newsDetail.n_like, 10) + 1;
                                        var liked = newsDetail.liked == 1 ? 0 : 1;
                                        newsDetail.n_like = n_like;
                                        newsDetail.liked = liked;
                                        this.setState({newsDetail});

                                        Api.likeNews(this.state.newsDetail.id).then(res => {
                                            if (res.code == Constant.RESPONSE_CODE.MSG_SUCCESS) {
                                            } else {
                                                Util.showAlert(res.msg);
                                            }
                                        }).catch (error => {
                                            Util.showAlert(Constant.MESSAGES.EXCEPTION);
                                        });
                                    }}>
                                        <Image resizeMode="contain" style={styles.socialButtonIcon} source={newsDetail.liked == 1 ? require('../../images/sc-heart-liked.png') : require('../../images/sc-heart.png')} />
                                        <Text style={styles.socialButtonText}>{newsDetail.n_like}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButton}>
                                        <Image resizeMode="contain" style={styles.socialButtonIcon} source={require('../../images/sc-chat.png')} />
                                        <Text style={styles.socialButtonText}>{newsDetail.n_cmt}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButton}>
                                        <Image resizeMode="contain" style={styles.socialButtonIcon} source={require('../../images/sc-eye.png')} />
                                        <Text style={styles.socialButtonText}>{newsDetail.n_view}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                    {
                        !this.state.loading &&
                        <EventDateBreak date={"Tất cả bình luận"} />
                    }
                    {
                        !this.state.loading &&
                        comments
                    }
                    {
                        !this.state.loading &&
                        <View style={{height: 20}} />
                    }
                </ScrollView>
                {this.renderInput()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avaWrap: {
        width: 36,
        height: 36,
        overflow: 'hidden',
        borderRadius: 36,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        marginRight: 10,
        position: 'relative'
    },
    ava: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#555'
    },
    username: {
        color: colors.gray,
        fontSize: 13,
    },
    content: {
        fontSize: 15,
        marginHorizontal: 15,
        marginVertical: 5,
        lineHeight: 25,
        marginTop: 0,
        fontSize:16,
        color: '#555',
        fontWeight: 'bold'
    },
    time: {
        color: colors.gray,
        fontSize: 13
    },
    commentWrap: {
		padding: 15
	},
    socialButtonWrap: {
        justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 1
	},
    socialButton: {
		height: 38,
		backgroundColor: '#fff',
		shadowColor: 'rgba(92, 92, 92, 0.4)',
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 1
		},
		borderRadius: 4,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '31%',
        borderColor: '#ddd',
        borderWidth: 1
	},
    socialButtonText: {
		marginRight: 16
	},
	socialButtonIcon: {
        width: 20,
		marginLeft: 16
    },
});
