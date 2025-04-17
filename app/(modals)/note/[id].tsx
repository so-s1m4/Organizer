import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import ComponentWithStore from '@/components/ComponentWithStore'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { router } from 'expo-router'

import { useLocalSearchParams } from 'expo-router'

export default function Wrapper() {
	const { id } = useLocalSearchParams()
	return <NoteFullScreen id={id} />
}

export class NoteFullScreen extends ComponentWithStore {
	state: {
		idNote: number
		currNote: any
	}

	constructor(props: any) {
		super(props)
		this.state = {
			idNote: props.id,
			currNote: null,
		}

		this.changeNoteDescription = this.changeNoteDescription.bind(this)
	}

	componentDidMount(): void {
		super.componentDidMount()
		this.setState({
			currNote: this.store.state.notes.find(
				(note: any) => note.id == this.state.idNote
			),
		})
	}
	componentWillUnmount(): void {
		super.componentWillUnmount()
		this.store.setState()
	}

	changeNoteDescription(e: any): void {
		this.state.currNote.description = e.nativeEvent.text
		this.setState({ currNote: this.state.currNote })
	}

	render(): React.ReactNode {
		if (!this.state.currNote) return null

		const styles = StyleSheet.create({
			close_button: {
				position: 'absolute',
				top: '50%',
				left: 0,
				transform: [{ translateY: '-50%' }, { translateX: '-30%' }],
			},

			private_button: {
				position: 'absolute',
				right: -10,
				top: 2,
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
			<SafeAreaView style={{ flex: 1 }}>
				<ThemedView
					style={{
						flex: 1,
						paddingVertical: 20,
						paddingHorizontal: 20,
					}}
				>
					<View style={{ justifyContent: 'space-between' }}>
						<Button
							icon={<IconSymbol name='arrow-back' size={32} color='#fff' />}
							style={styles.close_button}
							darkColor='transparent'
							lightColor='transparent'
							onPress={() => router.back()}
						/>
						<Button
							icon={
								<IconSymbol
									name={
										this.state.currNote.private ? 'lock.fill' : 'lock.open.fill'
									}
									size={32}
									color='#fff'
								/>
							}
							style={styles.private_button}
							darkColor='transparent'
							lightColor='transparent'
							onPress={() => {
								this.state.currNote.private = !this.state.currNote.private
								this.setState({ currNote: this.state.currNote })
							}}
						/>
					</View>

					<View style={{ marginTop: 20, gap: 10 }}>
						<TextInput
							textContentType='none'
							placeholder='Title'
							placeholderTextColor={'#707070'}
							style={{ ...styles.input, ...styles.input_title }}
							value={this.state.currNote.title}
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
							value={this.state.currNote.description}
							onChange={e => {
								this.changeNoteDescription(e)
							}}
						></TextInput>
					</View>
				</ThemedView>
			</SafeAreaView>
		)
	}
}
