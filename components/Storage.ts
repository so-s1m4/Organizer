class Store {
	state: {
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
	listeners: Set<any>

	constructor() {
		this.state = {
			notes: [
				{
					id: 1,
					title: 'Node',
					date: '2025-05-12',
					private: true,
					description:
						'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at. 123',
					share_to: ['Maks', 'Hui'],
				},
				{
					id: 2,
					title: 'Node',
					date: '2025-05-12',
					private: true,
					description:
						'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at.',
					share_to: ['Maks', 'deNis'],
				},
				{
					id: 3,
					title: 'Node',
					date: '2025-05-12',
					private: false,
					description:
						'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at.',
					share_to: ['Maks', 'Hui', 'deNis'],
				},
				{
					id: 4,
					title: 'Node',
					date: '2025-05-12',
					private: true,
					description:
						'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at.',
					share_to: ['Maks', 'Hui', 'deNis'],
				},
				{
					id: 5,
					title: 'Node',
					date: '2025-05-12',
					private: false,
					description:
						'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at.',
					share_to: ['Maks', 'deNis'],
				},
				{
					id: 6,
					title: 'Node',
					date: '2025-05-12',
					private: true,
					description:
						'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga molestiae nobis commodi sunt nihil, maxime cum, animi unde dicta eius accusantium ratione dignissimos quam nulla temporibus. Ducimus ipsam quod at. 589',
					share_to: ['Maks', 'Hui', 'deNis'],
				},
			],
			tasks: [],
			events: [],
			expenses: [
				{
					id: 1,
					title: 'Node',
					amount: 500,
					date: '2025-05-10',
					description: '',
					tag: 1,
				},
				{
					id: 2,
					title: 'Node',
					amount: 500,
					date: '2025-05-12',
					description: '',
					tag: 2,
				},
				{
					id: 2,
					title: 'Node',
					amount: 500,
					date: '2025-05-16',
					description: '',
					tag: 3,
				},
				{
					id: 3,
					title: 'Node',
					amount: 500,
					date: '2025-05-12',
					description: '',
					tag: 1,
				},
				{
					id: 4,
					title: 'Node',
					amount: 500,
					date: '2025-05-12',
					description: '',
					tag: 4,
				},

				{
					id: 2,
					title: 'Node',
					amount: 500,
					date: '2025-05-16',
					description: '',
				},
				{
					id: 3,
					title: 'Node',
					amount: 500,
					date: '2025-05-12',
					description: '',
					tag: 1,
				},
				{
					id: 4,
					title: 'Node',
					amount: 500,
					date: '2025-05-12',
					description: '',
				},
			],
			tags: [
				{
					id: 1,
					title: 'Entertainment',
					background: 'red',
					color: 'pink',
				},
				{
					id: 2,
					title: 'Food',
					background: 'green',
					color: 'lime',
				},
				{
					id: 3,
					title: 'School',
					background: 'blue',
					color: 'lightblue',
				},
				{
					id: 4,
					title: 'Work',
					background: 'white',
					color: 'black',
				},
			],
			token: 'Jla',
		}
		this.listeners = new Set()
	}

	register(component) {
		this.listeners.add(component)
	}

	unregister(component) {
		this.listeners.delete(component)
	}

	async setState(newState) {
		this.state = { ...this.state, ...newState }
		this.listeners.forEach(component => component.loadInfo())
	}

	getState() {
		return this.state
	}
}

export const store = new Store()
