import { useWindowDimensions, StyleSheet } from 'react-native';

const getVW = percent => useWindowDimensions().width / 100 * percent;

const CSSVars = {
	binaryColor: '#EB043E',
	decimalColor: '#FDD017',
	octalColor: '#0C8FF5',
	hexadecimalColor: '#4CC417',
	white: '#ede6f7',
	black: '#120c21'
}

const styles = StyleSheet.create({
	root: {
		width: '100%',
		height: '100%',
		backgroundColor: CSSVars.white,
	},
	header: {
		width: '100%',
		padding: '3%',
		backgroundColor: CSSVars.black
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: getVW(4) * 1.2,
		fontWeight: '900'
	},
	mainContainer: {
		width: '100%',
		padding: '1%',
		marginTop: '45%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	column: {
		width: '49%',
		alignItems: 'center',
		marginBottom: getVW(2)
	},
	input: {
		padding: '2%',
		width: '96%',
		backgroundColor: 'rgba(0,0,0,.1)',
		textAlign: 'center',
		lineHeight: 18,
		borderRadius: getVW(1.3),
		marginBottom: getVW(2)
	},
	baseMismatch: {
		marginBottom: getVW(4)
	},
	baseMismatchText: {
		fontSize: 12
	},
	button: {
		width: '60%',
		padding: '2.5%',
		marginBottom: getVW(2),
		borderRadius: getVW(1.4),
		elevation: 3
	},
	buttonText: {
		textAlign: 'center',
		textShadowColor: 'rgba(0,0,0,.4)',
		textShadowRadius: 3,
		textShadowOffset: {
			width: 0,
			height: 0
		},
		fontSize: getVW(4) / 100 * 90
	},
	convert_button: {
		width: '70%',
		alignSelf: 'flex-end',
		padding: '2%',
		borderRadius: getVW(1.4),
		elevation: 3,
		backgroundColor: '#7d3ae0',
		marginLeft: '15%'
	},
	convert_text: {
		color: CSSVars.white,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export { styles as default, CSSVars };