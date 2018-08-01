import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Platform, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';

class PostDetailInfo extends PureComponent {

    _renderCover(post) {
        if(post.cover) return <Image source={{uri: post.cover}} resizeMode="cover" style={styles.cover} />;
        return null;
    }

    _renderContent(post) {
        if(post.short_description) return <Text style={styles.content}>{post.short_description}</Text>;
        return null;
    }

    render() {
        const { post } = this.props;
        return (
            <View style={[styles.wrap, common.cardShadow]}>
                <View style={{flexDirection: 'row', padding: 15}}>
                    <View style={styles.avaWrap}><Image source={{uri: post.avatar}} resizeMode="cover" style={styles.ava} /></View>
                    <View>
                        <Text style={styles.name}>{post.publish_name}</Text>
                        <Text style={styles.username}>@{post.publish_username}</Text>
                    </View>
                    <Text style={styles.time}>{post.publish_date}</Text>
                </View>
                <TouchableOpacity onPress={this.props.gotoDetail} >
                    {this._renderContent(post)}
                    {this._renderCover(post)}
                </TouchableOpacity>
                <View style={styles.commentWrap}>
                    <View style={styles.socialButtonWrap}>
                      {[1, 2, 3].map((item, index) => {
                          return (
                              <View style={styles.avaContainer} key={`cmt_${index}`}>
                                  <Image
                                      source={require('../images/demo/ava.png')}
                                      style={styles.avaFriend}
                                  />
                              </View>
                          )
                      })}
                      <TouchableOpacity>
                          <Text style={[styles.mail, { marginLeft: 5 }]}>{post.n_cmt} bình luận</Text>
                      </TouchableOpacity>
                      <View style={{flex: 1}} />
                      <TouchableOpacity
                          style={styles.iconContainer}>
                          <Image
                              style={{width: 24, height: 20}}
                              source={require('../images/heart-a.png')}
                          />
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        borderRadius: 8,
        margin: 15,
        marginBottom: 0,
        backgroundColor: '#fff',
        paddingBottom: 5,
        position: 'relative'
    },
    comment: {
        fontSize: 15,
        color: colors.gray
    },
    dot: {
        backgroundColor: colors.green,
        width: 8,
        height: 8,
        borderRadius: 8,
    },
    avaWrap: {
        width: 36,
        height: 36,
        overflow: 'hidden',
        borderRadius: 36,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        marginRight: 10,
        position: 'relative'
    },
    avaWrapSmall: {
        width: 20, height: 20,
        borderWidth: 2,
        borderColor: '#fff'
    },
    likeIcon: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 22,
        height: 22
    },
    ava: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    avaFriend: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "white",
        resizeMode: 'cover',
    },
    avaContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginLeft: -7,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 2
    },
    username: {
        color: colors.gray,
        fontSize: 13,
    },
    cover: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        height: 176,
        marginBottom: 15
    },
    content: {
        fontSize: 15,
        color: 'black',
        margin: 15,
        marginTop: 0
    },
    time: {
        color: colors.gray,
        fontSize: 13,
        position: 'absolute',
        right: 15,
        top: 20
    },
    commentWrap: {
		padding: 5
	},
	socialButtonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    likeButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15
    },
});

export default PostDetailInfo;
