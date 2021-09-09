import { useState } from 'react';
import axios from 'axios';
import { commentsServiceUrl } from 'api/urls';

const CreateComment = (props) => {
	const { postId } = props;

	const [content, setContent] = useState('');

	const onSend = async (e) => {
		e.preventDefault();

		const payload = {
			content,
		};

		const response = await axios.post(
			`${commentsServiceUrl}/posts/${postId}/comments`,
			payload
		);

		console.log(response);
		setContent('');
	};
	return (
		<div>
			<form onSubmit={onSend}>
				<div className='form=group'>
					<label> Comment here</label>
					<input
						className='form-control'
						value={content}
						onChange={(e) => setContent(e.currentTarget.value)}
					/>
				</div>
				<br />
				<button className='btn btn-primary'> Send </button>
			</form>
		</div>
	);
};

export default CreateComment;
