const express = require('express');
// const cors = require('cors');

const app = express();

app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
	//Allow Access from different origins
	res.header('Access-Control-Allow-Origin', '*');

	//Allow Access for Different Headers
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	//Allow Access for the following request methods
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
		return res.status(200).json({});
	}

	next();
});

const posts = {};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}

	if (type === 'CommentCreated') {
		const { id, content, status, postId } = data;

		const post = post[postId];
		post.comments.push({ id, content, status });
	}

	if (type === 'CommentUpdated') {
		const { id, postId, status, content } = data;

		// find the post in the exisiting lists of posts
		const post = posts[postId];

		const theComment = post.comments.find((comment) => comment.id === id);

		theComment.status = status;
		theComment.content = content;
	}

	res.send({});
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`QUERY SERVICE RUNNING ON PORT ${PORT}`));
