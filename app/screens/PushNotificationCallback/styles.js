import {StyleSheet, Platform} from "react-native";

export default StyleSheet.create({
	articleContainer: {
		backgroundColor: 'white',
		flex: 1
	},
	headerArticle: {
		height: (Platform.OS === 'ios') ? 60 : 40,
		backgroundColor: '#90CAF9',
        paddingTop:  (Platform.OS === 'ios') ? 20 : 0,
    },
	postCover: {
		width: '100%',
		height: 200,
		marginBottom: 14
	},
	date: {
		fontSize: 14,
		color: '#90CAF9',
		paddingHorizontal: 15,
		marginBottom: 8
	},
	shortDes: {
		fontSize: 16,
		color: '#303030',
		paddingHorizontal: 15,
		marginBottom: 8,
		fontWeight: 'bold'
	},
	title: {
		fontSize: 20,
		color: '#90CAF9',
		paddingHorizontal: 15,
		fontWeight: '500',
		marginBottom: 24
	},
	postContent:{
		marginBottom: 12,
		alignItems: 'stretch'
	},
	commentWrap: {
		backgroundColor: '#efeff4',
		padding: 12
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
	},
	socialButtonText: {
		marginRight: 16
	},
	socialButtonIcon: {
		width: 20,
		marginLeft: 16
	},
	backButton: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 130,
		height: '100%'
	},
	backButtonIcon: {
		height: 14
	},
	backButtonText: {
		color: 'white',
		fontSize: 14
	},
	progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	contentContainer: {
		paddingHorizontal: 0
	}
});
