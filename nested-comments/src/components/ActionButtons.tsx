const ActionButtons = ({
	showDeleteButton,
	handleReplyButtonClick,
	handleCommentDeletion,
}: {
	showDeleteButton: boolean
	handleReplyButtonClick: () => void
	handleCommentDeletion: () => void
}) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
			<button onClick={handleReplyButtonClick}>Reply</button>
			{showDeleteButton && <button onClick={handleCommentDeletion}>Delete</button>}
		</div>
	)
}

export default ActionButtons
