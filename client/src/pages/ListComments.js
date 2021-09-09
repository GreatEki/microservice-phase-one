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

			setComments(res.data);
		})();
	}, [postId]);

	const renderComments = comments.map((comment) => {
		let content;

		switch (comment.status) {
			case 'approved': {
				content = comment.content;
				break;
			}

			case 'pending': {
				content = 'This comment is awaiting moderation';
				break;
			}

			case 'rejected': {
				content = ' This comment has been rejected';
				break;
			}

			default: {
				content = 'This comment is awaiting moderation';
			}
		}

		return <li> {content} </li>;
	});

	return <ul> {renderComments} </ul>;
};

export default ListComments;
