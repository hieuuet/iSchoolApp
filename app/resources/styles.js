/*
	Common style for app
 */
import {StyleSheet, Platform} from "react-native";
import colors from './colors';
import dimens from './dimens';

export default StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	roundedTag: {
		borderColor: '#d7d7d7',
		borderWidth: 1,
		borderRadius: 100,
		shadowColor: 'transparent',
		marginRight: 8,
		marginBottom: 8,
		paddingVertical: 8,
		paddingHorizontal: 16
	},
	locationHeader: {
        backgroundColor: colors.primaryColor,
        paddingHorizontal: 0,
        //height: 57,
        //paddingTop: 18,
        paddingTop:  (Platform.OS === 'ios') ? 20 : 0,
        height: (Platform.OS === 'ios') ? 59 : 39
    },
    locationHeaderRow: {
		// justifyContent: 'flex-start',
		flexDirection: 'row',
        alignItems: 'center',
    },
    locationHeaderItem: {
    	marginLeft: 8,
    	height: 23,
        paddingVertical: 0
    },
	locationHeaderFirstItem: {
    	marginLeft: 0,
    	height: 23,
        paddingVertical: 0
    },
    modalBackdrop: {
        backgroundColor: 'rgba(26, 3, 11, 0.8)',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
		paddingHorizontal: 10
    },
    modalInner: {
        overflow: 'hidden',
        backgroundColor: '#EFEFF4',
        borderRadius: 8,
        width: '100%',
        maxHeight: '80%',
        position: 'relative'
    },
    listItem: {
        backgroundColor: '#FFF',
        paddingLeft: 20,
        color: '#677897',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
        paddingVertical: 8
    },
    modalHeader: {
        borderRadius: 8,
        paddingLeft: 20,
        marginTop: 8,
        paddingVertical: 16,
        paddingTop: 10
    },
    closeModalButton: {
        width: 100,
		height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    closeButtonText: {color: '#FFF', marginRight: 12},
    closeButtonIcon: {height: 10},
    backButton: {
        backgroundColor: '#FFFFFF',
        width: 110,
        marginTop: 24,
        shadowColor: 'rgba(89, 89, 89, 0.38)',
    },
    contentCard: {
        borderRadius: 4,
        marginHorizontal: 15,
        padding: 24,
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: 24,
        backgroundColor: 'white'
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#e62565',
        marginBottom: 16
    },
    lineInput: {
        borderBottomWidth: (Platform.OS === 'ios') ? 1:0,
        borderBottomColor: '#d8d8d8',
        height: 40
    },
    inputWrap: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        right: 0,
        height: 14,
        width: 14,
        top: 12
    },
});
