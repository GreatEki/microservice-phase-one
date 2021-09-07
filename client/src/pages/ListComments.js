import { useState, useEffect } from 'react';
import axios from 'axios';
import { commentsServiceUrl } from 'api/urls';

const ListComments = (props) => {
	const { postId } = props;
	const [comments, setComments] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await axios.post(
				`${commentsServiceUrl}/posts/${postId}/comments`
			);

			console.log(res);

			setComments(res.data);
		})();
	}, [postId]);

	const renderComments = comments.map((comment) => {
		return <li> {comment.content} </li>;
	});

	return <ul> {renderComments} </ul>;
};

export default ListComments;
