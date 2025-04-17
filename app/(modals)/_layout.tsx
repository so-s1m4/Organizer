// app/(modals)/_layout.tsx
import React from 'react'
import { Stack } from 'expo-router'

export default function ModalLayout() {
	return <Stack screenOptions={{ presentation: 'modal', headerShown: false }} />
}
