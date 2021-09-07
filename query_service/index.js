const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
		console.log(posts);
	}

	if (type === 'CommentCreated') {
		const { id, content, postId } = data;

		const post = post[postId];
		post.comments.push({ id, content });
		console.log(posts);
	}

	res.send({});
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`QUERY SERVICE RUNNING ON PORT ${PORT}`));
