import { useState } from 'react'
import { CommentType } from './Comment'

const CommentInput = ({
	parentComment,
	setParentComment,
	comments,
	setComments,
}: {
	parentComment: CommentType
	setParentComment: React.Dispatch<React.SetStateAction<CommentType | null>>
	comments: CommentType[]
	setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}) => {
	const [text, setText] = useState('')

	const handleCommentSubmission = ($event: React.FormEvent<HTMLFormElement>) => {
		$event.preventDefault()

		const newComment: CommentType = {
			id: Date.now(),
			author: 'Shubham',
			text: text.trim(),
			createdAt: new Date().toDateString(),
			children: [],
		}

		const updateCommentsList = (commentsList: CommentType[]): CommentType[] => {
			return commentsList.map((comment) => {
				if (comment.id === parentComment.id) {
					return {
						...comment,
						children: [...comment.children, newComment],
					}
				}
				return {
					...comment,
					children: updateCommentsList(comment.children),
				}
			})
		}

		const updatedCommentsList = updateCommentsList(comments)
		setComments(updatedCommentsList)
		setText('')
		setParentComment(null)
	}

	return (
		<form
			style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
			onSubmit={handleCommentSubmission}>
			<textarea
				rows={8}
				value={text}
				placeholder={`Replying to ${parentComment.author}`}
				onChange={($event) => setText($event.target.value)}
			/>
			<button
				type='submit'
				style={{ alignSelf: 'flex-end' }}>
				Submit
			</button>
		</form>
	)
}

export default CommentInput
