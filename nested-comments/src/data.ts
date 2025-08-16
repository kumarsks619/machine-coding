import { CommentType } from './components/Comment'

export const COMMENTS_DATA: CommentType[] = [
	{
		id: 1,
		author: 'Sarah Chen',
		text: 'Just finished implementing the new authentication system. The JWT tokens are working perfectly with the refresh mechanism!',
		createdAt: '2024-01-15',
		children: [
			{
				id: 2,
				author: 'Mike Johnson',
				text: 'Awesome work! How did you handle the token expiration on the frontend?',
				createdAt: '2024-01-15',
				children: [
					{
						id: 3,
						author: 'Sarah Chen',
						text: 'I used axios interceptors to automatically refresh tokens when they expire. Works seamlessly!',
						createdAt: '2024-01-15',
						children: [
							{
								id: 4,
								author: 'Alex Rodriguez',
								text: "That's a clean approach! Did you implement any retry logic for failed refresh attempts?",
								createdAt: '2024-01-15',
								children: [],
							},
						],
					},
					{
						id: 5,
						author: 'Emily Davis',
						text: "Could you share the interceptor code? I'm working on something similar.",
						createdAt: '2024-01-15',
						children: [
							{
								id: 6,
								author: 'Sarah Chen',
								text: "Sure! I'll create a gist and share it in our team channel.",
								createdAt: '2024-01-16',
								children: [],
							},
						],
					},
				],
			},
			{
				id: 7,
				author: 'David Kim',
				text: 'Great timing! I was just about to ask about authentication. Is this ready for the staging environment?',
				createdAt: '2024-01-15',
				children: [],
			},
		],
	},
]
