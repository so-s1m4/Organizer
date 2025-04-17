import React from 'react'
import ComponentWithStore from '@/components/ComponentWithStore'
import { View, FlatList, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import MasonryList from '@react-native-seoul/masonry-list'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { IconSymbol } from '@/components/ui/IconSymbol'

import { Button } from '@/components/Button'
import { Link, router } from 'expo-router'
import { Colors, tintColorDark } from '@/constants/Colors'

interface Note {
	id: number
	description?: string
	date?: string
	private: boolean
	title: string
	share_to: string[]
}

export default class NotesScreen extends ComponentWithStore {
	constructor(props: any) {
		super(props)
	}
	noteTemplate(note: Note): React.ReactNode | null {
		if (!note) return null

		const today = new Date().toISOString().split('T')[0]
		const yesterday = new Date(Date.now() - 86400000)
			.toISOString()
			.split('T')[0]

		const styles = StyleSheet.create({
			noteContainer: {
				width: '95%',
				marginBottom: 12,
				marginHorizontal: 4,
			},
			note: {
				width: '100%',
				position: 'relative',
				maxHeight: 350,
				padding: 8,

				borderRadius: 5,
			},
			note_description: {
				maxHeight: 180,
				minHeight: 50,
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
			note_footer: {
				marginTop: 20,
				bottom: 0,
				height: 30,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'flex-end',

				borderTopWidth: 1,
				borderTopColor: Colors.dark.text,
			},
		})

		return (
			<Link href={`/(modals)/note/${note.id}`} style={styles.noteContainer}>
				<ThemedView
					style={styles.note}
					darkColor={Colors.dark.second}
					lightColor='#f0f0f0'
				>
					<ThemedText
						darkColor={tintColorDark}
						lightColor='#fff'
						type='subtitle'
					>
						{note.title}
					</ThemedText>

					{
						<ThemedText
							darkColor={Colors.dark.text}
							lightColor='#000'
							type='body'
							style={{
								...styles.note_description,
							}}
						>
							{note.private ? (
								<View
									style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}
								>
									<IconSymbol
										size={24}
										name='lock.fill'
										color={Colors.dark.text}
									/>
									<ThemedText type='title'>...</ThemedText>
								</View>
							) : (
								note.description
							)}
						</ThemedText>
					}

					<View style={styles.note_footer}>
						<View style={{ flexDirection: 'row', gap: '15%' }}>
							<FontAwesome name='user' size={24} color={Colors.dark.text} />
							<ThemedText type='subtitle'>{note.share_to.length}</ThemedText>
						</View>
						<View>
							<ThemedText type='body'>
								{note.date === today
									? 'Today'
									: note.date === yesterday
									? 'Yesterday'
									: note.date || 'No date'}
							</ThemedText>
						</View>
					</View>
				</ThemedView>
			</Link>
		)
	}

	render(): React.ReactNode {
		const styles = StyleSheet.create({
			container: {
				position: 'relative',
				width: '100%',
			},
			notes_wrapper: {
				paddingTop: 20,
				paddingHorizontal: 8,
			},
			create_button: {
				width: 60,
				height: 60,
				position: 'absolute',
				bottom: '12%',
				right: '20%',

				justifyContent: 'center',
				alignItems: 'center',

				backgroundColor: Colors.dark.text,
				borderRadius: 50,

				transform: [{ translateY: '50%' }, { translateX: '50%' }],
				zIndex: 2,
			},
		})
		return (
			<SafeAreaView style={{ flex: 1, position: 'relative' }}>
				<ThemedView style={{ ...styles.container, flex: 1 }}>
					<ThemedText type='bigTitle' style={{ marginTop: 10, marginLeft: 10 }}>
						Notes
					</ThemedText>

					<Button
						style={styles.create_button}
						icon={<FontAwesome name='plus' size={24} color='#fff' />}
						darkColor='transparent'
						lightColor='transparent'
						onPress={() => router.push('/(modals)/note/createNote')}
					/>

					<MasonryList
						data={this.state.notes || []}
						numColumns={2}
						ListEmptyComponent={
							<ThemedText
								type='subtitle'
								style={{
									textAlign: 'center',
								}}
							>
								Нет заметок
							</ThemedText>
						} // No notes
						keyExtractor={item => item.id.toString()}
						renderItem={({ item }) => this.noteTemplate(item)}
						contentContainerStyle={styles.notes_wrapper}
					/>
				</ThemedView>
			</SafeAreaView>
		)
	}
}
