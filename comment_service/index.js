const express = require('express');
const { randomBytes } = require('crypto');
const app = express();

app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex');

	const { content } = req.body;

	// Check if Post exists
	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content });

	commentsByPostId[req.params.id] = comments;

	res.status(201).send(comments);
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`COMMENT SERVICE RUNNING ON PORT ${PORT}`));
