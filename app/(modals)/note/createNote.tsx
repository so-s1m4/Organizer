import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import ComponentWithStore from '@/components/ComponentWithStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

export default class CreateNote extends ComponentWithStore {
	state: {
		title: string
		description: string
		notes: Array<{
			id: number
			title: string
			date: string
			private: boolean
			description: string
			share_to: string[]
		}>
		tasks: Array<{
			id: number
			tasks: Array<[boolean, string]>
			deadline: string
		}>
		events: any[]
		expenses: any[]
		tags: Array<{
			id: number
			title: string
			background: string
			color: string
		}>
		token: String
	}
	constructor(props: any) {
		super(props)
		this.state = {
			title: '',
			description: '',
		}

		this.createNote = this.createNote.bind(this)
	}
	createNote() {
		this.store.state.notes.push({
			id: this.store.state.notes.length + 1,
			title: this.state.title,
			description: this.state.description,
			date: new Date().toISOString().split('T')[0],
			share_to: [],
			private: false,
		})
		this.store.setState({})
		router.back()
	}

	render() {
		const styles = StyleSheet.create({
			close_button: {
				position: 'absolute',
				top: '50%',
				left: 0,
				transform: [{ translateY: '-50%' }, { translateX: '-30%' }],
			},
			save_button: {
				position: 'absolute',
				right: -10,
				top: '50%',
				transform: [{ translateY: '-50%' }],
			},

			input: {
				color: '#fff',
			},
			input_title: {
				fontSize: 24,
			},
			input_description: {
				height: '80%',
				fontSize: 16,
			},
			date: {
				marginLeft: 5,
			},
		})
		return (
			<SafeAreaView style={{ flex: 1, position: 'relative' }}>
				<ThemedView
					style={{
						flex: 1,
						paddingVertical: 20,
						paddingHorizontal: 20,
					}}
				>
					<View style={{ justifyContent: 'space-between' }}>
						<Button
							icon={<IconSymbol name='arrow-back' size={32} color='white' />}
							style={styles.close_button}
							darkColor='transparent'
							lightColor='transparent'
							onPress={() => router.replace('/(tabs)/notes')}
						/>
						<Button
							icon={<IconSymbol name='check' size={32} color='#fff' />}
							style={styles.save_button}
							darkColor='transparent'
							lightColor='transparent'
							onPress={() => this.createNote()}
						/>
					</View>

					<View style={{ marginTop: 20, gap: 10 }}>
						<TextInput
							textContentType='none'
							placeholder='Title'
							placeholderTextColor={'#707070'}
							style={{ ...styles.input, ...styles.input_title }}
							value={this.state.title}
							onChangeText={text => this.setState({ title: text })}
						></TextInput>
						<View style={styles.date}>
							<ThemedText type='body'>
								{new Date().toISOString().split('T')[0]}
							</ThemedText>
						</View>
						<TextInput
							textContentType='none'
							placeholder='Description'
							multiline={true}
							placeholderTextColor={'#707070'}
							textAlign='left'
							textAlignVertical='top'
							style={{ ...styles.input, ...styles.input_description }}
							value={this.state.description}
							onChangeText={text => this.setState({ description: text })}
						></TextInput>
					</View>
				</ThemedView>
			</SafeAreaView>
		)
	}
}
