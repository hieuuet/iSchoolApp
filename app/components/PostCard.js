import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Platform, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';

class EventCard extends PureComponent {
    _renderCover(post) {
        if(post.cover) return <Image source={{uri: post.cover}} resizeMode="cover" style={styles.cover} />;
        return null;
    }

    _renderContent(post) {
        if(post.short_description) return <Text style={styles.content}>{post.short_description}</Text>;
        return null;
    }

    render() {
        const { post, onLike, onComment } = this.props;

        return (
            <View style={[styles.wrap, common.cardShadow]}>
                <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
                    <View>
                        <Text style={styles.name}>{post.title}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.username}>@{post.publish_name}</Text>
                        <Text style={styles.time}>{post.publish_date}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={this.props.gotoDetail} >
                    {this._renderContent(post)}
                    {this._renderCover(post)}
                </TouchableOpacity>
                <View style={styles.commentWrap}>
                    <View style={styles.socialButtonWrap}>
                        <TouchableOpacity style={styles.socialButton} onPress={() => {
                            if (typeof onLike != 'undefined') onLike();
                        }}>
                            <Image resizeMode="contain" style={styles.socialButtonIcon} source={post.liked == 1 ? require('../images/sc-heart-liked.png') : require('../images/sc-heart.png')} />
                            <Text style={styles.socialButtonText}>{post.n_like}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton} onPress={this.props.gotoDetail}>
                            <Image resizeMode="contain" style={styles.socialButtonIcon} source={require('../images/sc-chat.png')} />
                            <Text style={styles.socialButtonText}>{post.n_cmt}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image resizeMode="contain" style={styles.socialButtonIcon} source={require('../images/sc-eye.png')} />
                            <Text style={styles.socialButtonText}>{post.n_view}</Text>
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
        marginBottom: 2,
        color: '#555'
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
        marginHorizontal: 15,
        marginVertical: 5,
        lineHeight: 25,
        marginTop: 0
    },
    time: {
        color: colors.gray,
        fontSize: 13
    },
    commentWrap: {
		padding: 5
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
    likeButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15
    },
});

export default EventCard;
