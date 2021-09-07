const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

// Express Middleware and Body Parser
app.use(express.json());
app.use(cors());

const posts = {};
const EVENTBUS_SERVICE = 'http://locahost:4005/events';

app.post('/events', (req, res) => {
	console.log('Received Events', req.body.type);

	res.send({});
});

app.get('/posts', async (req, res) => {
	res.status(200).send(posts);
});

app.post('/posts', async (req, res) => {
	try {
		const id = randomBytes(4).toString('hex');

		const { title } = req.body;

		posts[id] = {
			id,
			title,
		};

		const eventObj = {
			type: 'PostCreated',
			data: posts[id],
		};

		await axios
			.post(`${EVENTBUS_SERVICE}`, eventObj)
			.catch((err) => console.log(err.message));

		return res.status(201).send(posts[id]);
	} catch (err) {
		return res.status(500).send({
			status: 'false',
			error: err.message,
		});
	}
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`POST SERVICE LISTENING ON PORT ${PORT}`));
