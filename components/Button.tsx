import React from 'react'
import { Pressable, StyleSheet, ViewStyle, TextStyle, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { IconSymbol } from './ui/IconSymbol'

type ButtonProps = {
	label: string
	onPress: () => void
	icon?: typeof FontAwesome | typeof IconSymbol | undefined
	iconPosition?: 'left' | 'right'
	disabled?: boolean
	style?: ViewStyle
	textStyle?: TextStyle
	darkColor?: string
	lightColor?: string
}

export const Button: React.FC<ButtonProps> = ({
	label,
	onPress,
	icon,
	iconPosition = 'left',
	disabled = false,
	style,
	textStyle,
	darkColor = '#1f1f1f',
	lightColor = '#e0e0e0',
}) => {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ opacity: pressed || disabled ? 0.6 : 1 },
				style,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<ThemedView
				style={styles.inner}
				darkColor={darkColor}
				lightColor={lightColor}
			>
				{icon || null}
			</ThemedView>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	text: {
		fontSize: 16,
		fontWeight: '600',
	},
	icon: {
		marginHorizontal: 6,
	},
})
