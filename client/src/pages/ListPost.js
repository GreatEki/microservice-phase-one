import { useState, useEffect } from 'react';
import axios from 'axios';
import { postServiceUrl } from 'api/urls';

import CreateComment from 'pages/CreateComment';

const ListPost = () => {
	const [posts, setPosts] = useState({});

	useEffect(() => {
		(async () => {
			const res = await axios.get(`${postServiceUrl}/posts`);

			setPosts(res.data);
			console.log(res.data);
		})();
	}, []);

	const renderPosts = Object.values(posts).map((post, index) => {
		return (
			<div
				key={index}
				className='card'
				style={{ width: '30%', marginBottom: '20px' }}>
				<div className='card-body'>
					<h3>{post.title}</h3>
					<CreateComment postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div className='d-flex flex-row flex-wrap justify-content-between'>
			{renderPosts}
		</div>
	);
};

export default ListPost;
