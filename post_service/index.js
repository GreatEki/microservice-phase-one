const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

// Express Middleware and Body Parser
app.use(express.json());

const posts = [];

app.get('/posts', (req, res) => {
	res.status(200).send(posts);
});

app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');

	const { title } = req.body;

	posts[id] = {
		id,
		title,
	};

	res.status(201).send(posts[id]);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`POST SERVICE LISTENING ON PORT ${PORT}`));
