const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

const EVENTBUS_SERVICE = 'http://127.0.0.1:4005/events';

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentModerated') {
		const { id, postId, status, content } = data;

		const comments = commentsByPostId[postId];

		const theComment = comments.find((comment) => comment.id === id);

		// Update the status with the new status coming from  the moderation service
		theComment.status = status;

		const eventObj = {
			type: 'CommentUpdated',
			data: {
				id,
				postId,
				status,
				content,
			},
		};

		await axios.post(EVENTBUS_SERVICE, eventObj).catch((err) =>
			res.send({
				status: false,
				error: err.message,
			})
		);
	}
});

app.get('/posts/:id/comments', (req, res) => {
	res.status(200).send(commentsByPostId[req.params.id] || null);
});

app.post('/posts/:id/comments', async (req, res) => {
	try {
		// Create Comment Id for incoming comment
		const commentId = randomBytes(4).toString('hex');

		const { content } = req.body;

		const postId = req.params.id;

		// Check if Post exists
		const comments = commentsByPostId[postId] || [];

		comments.push({ id: commentId, content, status: 'pending' });

		commentsByPostId[postId] = comments;

		// Prepare payload for Event Bus
		const eventObj = {
			type: 'CommentCreated',
			data: {
				id: commentId,
				content,
				postId: postId,
				status: 'pending',
			},
		};

		// Emit Event to Event Bus
		await axios
			.post(`${EVENTBUS_SERVICE}`, eventObj)
			.catch((err) => console.log(err.message));

		return res.status(201).send(comments);
	} catch (err) {
		return res.status(500).send({
			status: false,
			error: err.message,
		});
	}
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`COMMENT SERVICE RUNNING ON PORT ${PORT}`));
