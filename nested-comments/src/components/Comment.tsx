import ActionButtons from './ActionButtons'
import CommentInput from './CommentInput'

export interface CommentType {
	id: number
	author: string
	text: string
	createdAt: string
	children: CommentType[]
}

const Comment = ({
	comment,
	parentComment,
	setParentComment,
	comments,
	setComments,
}: {
	comment: CommentType
	parentComment: CommentType | null
	setParentComment: React.Dispatch<React.SetStateAction<CommentType | null>>
	comments: CommentType[]
	setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}) => {
	const handleReplyButtonClick = () => {
		setParentComment(comment)
	}

	const handleCommentDeletion = () => {
		const filterCommentsList = (commentsList: CommentType[]): CommentType[] => {
			return commentsList
				.filter((c) => c.id !== comment.id)
				.map((comment) => ({ ...comment, children: filterCommentsList(comment.children) }))
		}

		const filteredCommentsList = filterCommentsList(comments)
		setComments(filteredCommentsList)
	}

	return (
		<div style={{ border: '1px solid gray', padding: '12px', marginBottom: '10px' }}>
			<div
				style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
				<h4>{comment.author}</h4>
				<span style={{ fontSize: '14px', color: 'gray' }}> at {comment.createdAt}</span>
				<ActionButtons
					showDeleteButton={comment.author === 'Shubham'}
					handleReplyButtonClick={handleReplyButtonClick}
					handleCommentDeletion={handleCommentDeletion}
				/>
			</div>
			<p style={{ marginBottom: '10px' }}>{comment.text}</p>
			{comment.children.map((childComment) => (
				<Comment
					key={childComment.id}
					comment={childComment}
					comments={comments}
					setComments={setComments}
					parentComment={parentComment}
					setParentComment={setParentComment}
				/>
			))}
			{parentComment?.id === comment.id && (
				<CommentInput
					parentComment={parentComment}
					setParentComment={setParentComment}
					comments={comments}
					setComments={setComments}
				/>
			)}
		</div>
	)
}

export default Comment
