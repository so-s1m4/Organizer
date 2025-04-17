import React from 'react'
import ComponentWithStore from '@/components/ComponentWithStore'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
	StyleSheet,
	View,
	Pressable,
	Modal,
	TextInput,
	TouchableWithoutFeedback,
	ScrollView,
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { CheckBox, Icon } from '@rneui/themed'

import { Button } from '@/components/Button'
import { Colors, tintColorDark } from '@/constants/Colors'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { DatePicker } from 'expo-datepicker'

export default class TasksScreen extends ComponentWithStore {
	state: {
		isModalVisible: boolean
		newtask: {
			deadline: Date
			tasks: string[]
		}
		expandedTasks: { [key: string]: boolean }
	}
	constructor(props: any) {
		super(props)
		this.state = {
			isModalVisible: false,
			newtask: {
				deadline: new Date().toISOString(),
				tasks: [''],
			},
			expandedTasks: {},
		}
	}

	toggleTaskExpand(taskId) {
		this.setState(prevState => ({
			expandedTasks: {
				...prevState.expandedTasks,
				[taskId]: !prevState.expandedTasks[taskId],
			},
		}))
	}

	createTask() {
		const tasks = this.state.newtask.map(task => [false, task])
		const newTask = {
			id: this.store.state.tasks.length + 1,
			tasks: tasks,
			deadline: new Date().toISOString().split('T')[0],
		}
		this.store.state.tasks.push(newTask)
		this.store.setState({})
	}

	componentDidMount(): void {
		super.componentDidMount()
	}

	checkTask(index, taskIndex) {
		const tasks = this.state.tasks
		tasks[index].tasks[taskIndex][0] = !tasks[index].tasks[taskIndex][0]

		this.setState({ tasks: tasks })
		this.store.setState({ tasks: tasks })
	}

	taskViewTemplace(taskObject, index): React.ReactNode {
		return (
			<View
				style={{
					backgroundColor: Colors.dark.third,
					padding: 5,
					borderRadius: 10,
					marginVertical: 10,
					marginHorizontal: 10,
					minWidth: '85%',
					minHeight: 30,
				}}
			>
				{taskObject.tasks.length == 1 ? (
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}
						key={index}
					>
						<CheckBox
							left
							iconType='material'
							checkedIcon='check-box'
							uncheckedIcon='check-box-outline-blank'
							checked={taskObject.tasks[0][0]}
							onPress={() => this.checkTask(index, 0)}
							containerStyle={{
								width: 40,
								backgroundColor: 'transparent',
							}}
							checkedColor={tintColorDark}
							uncheckedColor={tintColorDark}
						/>
						<ThemedText type='subtitle'>{taskObject.tasks[0][1]}</ThemedText>
					</View>
				) : (
					<View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<CheckBox
								iconType='material'
								checkedIcon='keyboard-arrow-down'
								uncheckedIcon='keyboard-arrow-right'
								containerStyle={{
									width: 40,
									backgroundColor: 'transparent',
								}}
								checkedColor={tintColorDark}
								checked={this.state.expandedTasks[taskObject.id]}
								onPress={() => {
									this.toggleTaskExpand(taskObject.id)
								}}
							/>
							<ThemedText type='subtitle'>Show More</ThemedText>
						</View>
						<View
							style={{
								paddingLeft: 20,
								display: this.state.expandedTasks[taskObject.id]
									? 'flex'
									: 'none',
							}}
							id={`show${taskObject.id}`}
						>
							{taskObject.tasks.map((task, taskIndex) => {
								return (
									<Pressable>
										<View
											style={{ flexDirection: 'row', alignItems: 'center' }}
											key={`${index}+${taskIndex}`}
										>
											<CheckBox
												left
												iconType='material'
												checkedIcon='check-box'
												uncheckedIcon='check-box-outline-blank'
												checked={task[0]}
												onPress={() => this.checkTask(index, taskIndex)}
												containerStyle={{
													width: 40,
													backgroundColor: 'transparent',
												}}
												checkedColor={tintColorDark}
												uncheckedColor={tintColorDark}
											/>
											<ThemedText type='subtitle'>{task[1]}</ThemedText>
										</View>
									</Pressable>
								)
							})}
						</View>
					</View>
				)}
			</View>
		)
	}

	modalWindowTemplate(): React.ReactNode {
		const styles = {
			modalOverlay: {
				flex: 1,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				justifyContent: 'flex-end',
				alignItems: 'center',
			},
			modalContent: {
				backgroundColor: Colors.dark.third,
				padding: 20,
				borderRadius: 10,
				minWidth: '85%',
				minHeight: '40%',
			},
		}

		return (
			<Modal
				style={{
					flex: 1,
					justifyContent: 'flex-end',
					margin: 0,
				}}
				visible={this.state.isModalVisible}
				animationType='fade'
				transparent={true}
				onRequestClose={() => {
					this.setState({ isModalVisible: false })
				}}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						this.setState({ isModalVisible: false })
					}}
				>
					<View style={styles.modalOverlay}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<ThemedText type='subtitle'>Create a new Task!</ThemedText>

									<Button
										onPress={() => this.setState({ isModalVisible: false })}
										style={{
											position: 'relative',
											padding: 0,
										}}
										icon={<IconSymbol name='check' size={25} color='#fff' />}
										darkColor='transparent'
									/>
								</View>
								<ScrollView style={{ flex: 1, maxHeight: '70%' }}>
									{this.state.newtask.tasks.map((task, index) => {
										return (
											<TextInput
												key={index}
												multiline={true}
												numberOfLines={1}
												style={{
													backgroundColor: 'rgba(0, 0, 0, 0.2)',
													color: Colors.dark.text,
													padding: 10,
													borderRadius: 5,
													marginTop: 10,
													borderBottomWidth: 1,
													borderColor: Colors.dark.text,
												}}
												placeholder='Task name'
												value={task}
												onChangeText={text => {
													this.state.newtask.tasks[index] = text.trim()
													this.setState({ newtask: this.state.newtask })
												}}
												onKeyPress={event => {
													console.log(event.nativeEvent.key)
													if (event.nativeEvent.key == 'Enter') {
														this.state.newtask.tasks.splice(index + 1, 0, '')
														this.setState({ newtask: this.state.newtask })
													} else if (event.nativeEvent.key == 'Backspace') {
														if (
															this.state.newtask.tasks[index].length == 0 &&
															index > 0
														) {
															this.state.newtask.tasks.splice(index, 1)
															this.setState({ newtask: this.state.newtask })
														}
													}
												}}
												placeholderTextColor={Colors.dark.text}
												autoFocus={true}
												keyboardType='ascii-capable'
											/>
										)
									})}
								</ScrollView>
								<View>
									<DatePicker
										modal
										open={true}
										date={this.state.newtask.deadline || new Date()}
										mode='datetime'
										onConfirm={selectedDate => {
											this.state.newtask.deadline = selectedDate.toISOString()
											this.setState({ newtask: this.state.newtask })
										}}
										onCancel={() => {}}
									/>
								</View>h.
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		)
	}

	render(): React.ReactNode {
		const styles = StyleSheet.create({
			container: {
				position: 'relative',
				width: '100%',
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
						Tasks
					</ThemedText>

					<ScrollView style={{ flex: 1, gap: 50 }}>
						{this.state.tasks?.map((task, index) => {
							return this.taskViewTemplace(task, index)
						})}
					</ScrollView>

					<Button
						style={styles.create_button}
						icon={<FontAwesome name='plus' size={24} color='#fff' />}
						darkColor='transparent'
						lightColor='transparent'
						onPress={() => this.setState({ isModalVisible: true })}
					/>
					{this.modalWindowTemplate()}
				</ThemedView>
			</SafeAreaView>
		)
	}
}
