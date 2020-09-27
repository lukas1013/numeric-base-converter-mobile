import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import styles, { CSSVars } from './styles';

export default function Button({ base, selected = false, onPress }) {
	const selectedStyle = {
		button: {
			backgroundColor: '#0000',
			elevation: 0
		},
		text: {
			color: CSSVars[base + 'Color'],
			textShadowColor: '#0000',
			fontWeight: 'bold'
		}
	}
	
	return (
		<TouchableWithoutFeedback onPress={onPress}> 
			<View style={[styles.button, selected ? selectedStyle.button : {
				backgroundColor: CSSVars[base + 'Color']
			}]}>
				<Text style={[styles.buttonText, selected ? selectedStyle.text : {
					color: '#fff'
				}]}>{base.replace(/[bdoh]/, base.charAt(0).toUpperCase())}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}