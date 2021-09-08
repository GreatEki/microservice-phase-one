const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4003;

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

		await axios.post(`${EVENTBUS_SERVICE}`, eventObj).catch((err) =>
			res.send({
				status: false,
				error: err.message,
			})
		);
	}
});

app.listen(PORT, () =>
	console.log(`MODERATION SERVICE LISTENING ON PORT ${PORT}`)
);
