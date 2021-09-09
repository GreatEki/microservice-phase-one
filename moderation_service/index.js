const express = require('express');
// const cors = require('cors');
const axios = require('axios');

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

const EVENTBUS_SERVICE = 'http://127.0.0.1:4005/events';

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		// Approve or disapprove comment
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		const eventObj = {
			type: 'CommentModerated',
			data: {
				id: data.id,
				postId: data.postId,
				status,
				content: data.content,
			},
		};

		await axios.post(`${EVENTBUS_SERVICE}`, eventObj);
	}

	res.send({});
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () =>
	console.log(`MODERATION SERVICE LISTENING ON PORT ${PORT}`)
);
