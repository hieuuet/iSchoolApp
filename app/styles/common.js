import { Platform, StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
	cardShadow: {
		shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 2
        },
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
	},
    body: {
        backgroundColor: colors.body,
        flex: 1
    },
    tabIcon: {
        height: 20,
        marginBottom: 10,
        marginTop: 8
    },
    tabTitle: {
        color: colors.gray
    },
    tabCol: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ava: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    halfContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 15
    },
    halfCard: {
        width: Dimensions.get('window').width/2-22.5,
        height: Dimensions.get('window').width/2-22.5,
    },
});