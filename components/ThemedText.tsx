import { Text, type TextProps, StyleSheet } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'

export type ThemedTextProps = TextProps & {
	lightColor?: string
	darkColor?: string
	type?:
		| 'default'
		| 'title'
		| 'defaultSemiBold'
		| 'subtitle'
		| 'link'
		| 'bigTitle'
		| 'body'
}

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'default',
	...rest
}: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

	return <Text style={[{ color }, styles[type], style]} {...rest} />
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},

	body: {
		fontSize: 14,
		lineHeight: 20,
	},

	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
	},
	bigTitle: {
		fontSize: 42,
		fontWeight: 'bold',
		lineHeight: 42,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4',
	},
})
