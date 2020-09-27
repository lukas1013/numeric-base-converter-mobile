import React, { useReducer } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';

import styles from './styles';
import BaseButton from './BaseButton';
import { binaryFor, decimalFor, octalFor, hexadecimalFor } from './helper/conversion';

export default function App() {
	
	const basePatternAndPlaceholder = {
		2: {
			pattern: /[^01]+/,
			placeholder: 'only 0 and 1',
		},
		8: {
			pattern: /[^0-7]+/,
			placeholder: 'only digits 0 to 7',
		},
		10: {
			pattern: /[^\d]+/,
			placeholder: 'only digits 0 to 9',
		},
		16: {
			pattern: /[^\da-f]+/i,
			placeholder: 'only digits 0 to 9 and A to F'
		}
	}
	
	function reducer(state, action) {
		const newState = {...state}
		
		function getNextBase(previous) {
			let nextBase;
			
			if (previous === 10) {
				nextBase = 8
			}else if (previous === 8) {
				nextBase = 16
			}else if (previous === 16) {
				nextBase = 2
			}else {
				nextBase = 10
			}
			
			return nextBase
		}
		
		function setBase1(base, state) {
			state.base1 = base
		}
		
		function setBase2(base, state) {
			state.base2 = base
		}
		
		switch (action.type) {
			case 'set base1':
				setBase1(action.base, newState);
				if (newState.base2 === newState.base1) {
					const base2 = getNextBase(newState.base2)
					setBase2(base2, newState)
				}
				break;
			
			case 'set base1Value':
				newState.base1Value = action.value
				break;
			
			case 'set base2Value':
				newState.base2Value = action.value
				break;
				
			case 'set base1 mismatch':
				newState.base1Mismatch = action.value
				break;
				
			case 'set base2 mismatch':
				newState.base2Mismatch = action.value
				break;
			
			default:
				setBase2(action.base, newState)
				if (newState.base1 === newState.base2) {
					const base1 = getNextBase(newState.base1)
					setBase1(base1, newState)
				}
				break;
		}
		
		return newState
	}
	
	const [state, dispatch] = useReducer(reducer, {
		base1: 10,
		base1Value: '',
		base1Mismatch: false,
		base2: 2,
		base2Value: '',
		base2Mismatch: false
	})
	
	function convert() {
		const base1Mismatch = state.base1Mismatch
		const base2Mismatch = state.base2Mismatch
		const convertBase1 = (state.base1Value && state.base1Value.length), convertBase2 = (state.base2Value && state.base2Value.length && !(state.base1Value && state.base1Value.length))
		let res;
		
		if ((base1Mismatch && convertBase1) || (base2Mismatch && convertBase2)) {
			return
		}

		const base = convertBase1 ? state.base1 : state.base2;
		const forBase = convertBase1 ? state.base2 : state.base1;
		const number = convertBase1 ? state.base1Value : state.base2Value;
		
		switch (base) {
			case 8:
				res = octalFor(forBase, number);
				break;
				
			case 10:
				res = decimalFor(forBase, number);
				break;
			
			case 16:
				res = hexadecimalFor(forBase, number);
				break;
			
			//2
			default:
				res = binaryFor(forBase, number);
				break;
		}
		
		return dispatch({
			type: convertBase1 ? 'set base2Value' : 'set base1Value',
			value: String(res)
		})
		
	}
	
	return (
		<View style={styles.root}>
			<StatusBar 
				backgroundColor='#000'
				barStyle='light-content'
				/>
			
			<View style={styles.header}>
				<Text style={styles.title}>
					Numeric Base Converter
				</Text>
			</View>
			
			<View style={styles.mainContainer}>
			
				<View style={styles.column}>
					<TextInput
						style={styles.input}
						onChangeText={text => {
							const pattern = basePatternAndPlaceholder[state.base1].pattern
							if (text.match(pattern)) {
								return dispatch({
									type: 'set base1 mismatch',
									value: true
								})
							}
							
							dispatch({
								type: 'set base1Value',
								value: text
							})
						}}
						value={state.base1Value}
						placeholder={basePatternAndPlaceholder[state.base1].placeholder}
						/>
					
					<View style={styles.baseMismatch}>
						<Text style={[{ color: state.base1Mismatch ? 'red' : '#0000' }, styles.baseMismatchText]}>Please, enter only valid digits</Text>
					</View>
						
					<BaseButton selected={state.base1 === 2} onPress={() => {
						dispatch({
							type: 'set base1',
							base: 2
						})
					}} base='binary' />
					
					<BaseButton selected={state.base1 === 10} onPress={() => {
						dispatch({
							type: 'set base1',
							base: 10
						})
					}} base='decimal' />
					<BaseButton selected={state.base1 === 8} onPress={() => {
						dispatch({
							type: 'set base1',
							base: 8
						})
					}} base='octal' />
					<BaseButton selected={state.base1 === 16} onPress={() => {
						dispatch({
							type: 'set base1',
							base: 16
						})
					}} base='hexadecimal' />
					
				</View>
				
				
				<View style={styles.column}>
					<TextInput
						style={styles.input}
						onChangeText={text => {
							const pattern = basePatternAndPlaceholder[state.base2].pattern
							if (text.match(pattern)) {
								return dispatch({
									type: 'set base2 mismatch',
									value: true
								})
							}
							
							dispatch({
								type: 'set base2Value',
								value: text
							})
						}}
						value={state.base2Value}
						placeholder={basePatternAndPlaceholder[state.base2].placeholder}
						/>
					
					<View style={styles.baseMismatch}>
						<Text style={[{ color: state.base2Mismatch ? 'red' : '#0000' }, styles.baseMismatchText]}>Please, enter only valid digits</Text>
					</View>
					
					<BaseButton selected={state.base2 === 2} onPress={() => {
						dispatch({
							type: 'set base2',
							base: 2
						})
					}} base='binary' />
					<BaseButton selected={state.base2 === 10} onPress={() => {
						dispatch({
							type: 'set base2',
							base: 10
						})
					}} base='decimal' />
					<BaseButton selected={state.base2 === 8} onPress={() => {
						dispatch({
							type: 'set base2',
							base: 8
						})
					}} base='octal' />
					<BaseButton selected={state.base2 === 16} onPress={() => {
						dispatch({
							type: 'set base2',
							base: 16
						})
					}} base='hexadecimal' />
					
				</View>
				
				<TouchableOpacity 
					onPress={convert} 
					activeOpacity={0.7} 
					style={styles.convert_button}>
					<Text style={styles.convert_text}>Convert</Text>
				</TouchableOpacity>
				
			</View>
			<StatusBar style="auto" />
		</View>
	);
}