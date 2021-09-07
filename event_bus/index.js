const express = require('express');

const axios = require('axios');

const app = express();

app.use(express.json());

const postServiceEvents = 'http://127.0.0.1:4000/events';
const commentServiceEvents = 'http://127.0.0.1:4001/events';
const queryServiceEvents = 'http://127.0.0.1:4002/events';
const moderationServiceEvents = 'http://127.0.0.1:4003/events';

app.post('/events', async (request, response) => {
	const event = request.body;

	console.log(event);

	try {
		await axios
			.post(`${postServiceEvents}`, event)
			.catch((err) => console.log(err.message));
		await axios
			.post(`${commentServiceEvents}`, event)
			.catch((err) => console.log(err.message));
		await axios
			.post(`${queryServiceEvents}`, event)
			.catch((err) => console.log(err.message));

		response.send({ status: 'OK' });
	} catch (err) {
		return response.status(500).send({
			status: false,
			error: err.message,
		});
	}
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => console.log(`EVENT BUS RUNNING ON PORT ${PORT}`));
