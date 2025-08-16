import { useState } from 'react'

import Comment, { CommentType } from './components/Comment'
import { COMMENTS_DATA } from './data'
import './App.css'

function App() {
	const [comments, setComments] = useState(COMMENTS_DATA)
	const [parentComment, setParentComment] = useState<CommentType | null>(null)

	return (
		<div className='App'>
			{comments.map((comment) => (
				<Comment
					key={comment.id}
					comment={comment}
					comments={comments}
					setComments={setComments}
					parentComment={parentComment}
					setParentComment={setParentComment}
				/>
			))}
		</div>
	)
}

export default App
