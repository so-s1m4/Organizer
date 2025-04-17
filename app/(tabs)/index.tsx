import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function StartScreen() {
	return (
		<SafeAreaView>
			<ThemedView style={styles.container}>
				<ThemedText type='title' style={{ textAlign: 'center', marginTop: 20 }}>
					Start Screen
				</ThemedText>
			</ThemedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		width: '100%',
		height: '100%',
	},
})
