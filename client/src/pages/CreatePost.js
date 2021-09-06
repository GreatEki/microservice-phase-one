import React, { useState } from 'react';
import axios from 'axios';
import { postServiceUrl } from '../api/urls';

const CreatePost = () => {
	const [title, setTitle] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			title,
		};

		await axios.post(`${postServiceUrl}/posts`, payload);

		setTitle('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label> Post Title</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.currentTarget.value)}
						className='form-control'
					/>
				</div>
				<br />
				<button className='btn btn-primary'> Submit </button>
			</form>
		</div>
	);
};

export default CreatePost;
