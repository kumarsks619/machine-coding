import { CheckboxType } from './components/Checkbox'

export const CHECKBOXES_DATA: CheckboxType[] = [
	{
		id: 1,
		label: 'Sports',
		children: [
			{
				id: 2,
				label: 'Football',
				children: [
					{
						id: 3,
						label: 'Messi',
						children: [
							{
								id: 9,
								label: 'Barcelona',
							},
							{
								id: 10,
								label: 'Inter Miami',
							},
							{
								id: 11,
								label: 'PSG',
							},
						],
					},
					{
						id: 4,
						label: 'Ronaldo',
					},
					{
						id: 5,
						label: 'Neymar',
					},
				],
			},
			{
				id: 6,
				label: 'Cricket',
				children: [
					{
						id: 7,
						label: 'Kohli',
					},
					{
						id: 8,
						label: 'Dhoni',
					},
				],
			},
		],
	},
]
