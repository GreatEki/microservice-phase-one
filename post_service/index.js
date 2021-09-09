const express = require('express');
// const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

// Express Middleware and Body Parser
app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
	//Allow Access from different origins
	res.setHeader('Access-Control-Allow-Origin', '*');

	//Allow Access for Different Headers
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	//Allow Access for the following request methods
	if (req.method === 'OPTIONS') {
		res.setHeader(
			'Access-Control-Allow-Methods',
			'POST, PUT, PATCH, GET, DELETE'
		);
		return res.status(200).json({});
	}

	next();
});

const posts = {};
const EVENTBUS_SERVICE = 'http://127.0.0.1:4005/events';

app.get('/posts', async (req, res) => {
	res.status(200).send(posts);
});

app.post('/posts', async (req, res) => {
	try {
		// Create postId for incoming post.
		const id = randomBytes(4).toString('hex');

		const { title } = req.body;

		posts[id] = {
			id,
			title,
		};

		// Prepare payload for Event Bus
		const eventObj = {
			type: 'PostCreated',
			data: posts[id],
		};

		// Emit Event to Event Bus
		await axios.post(`${EVENTBUS_SERVICE}`, eventObj);
		// .catch((err) => console.log('Error Creating Post', err.message));

		return res.status(201).json(posts);
	} catch (err) {
		return res.status(500).send({
			status: 'false',
			error: err.message,
		});
	}
});

app.post('/events', (req, res) => {
	console.log('Received Events', req.body.type);

	res.send({});
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`POST SERVICE LISTENING ON PORT ${PORT}`));
