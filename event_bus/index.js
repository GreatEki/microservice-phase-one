const express = require('express');

const axios = require('axios');

const app = express();

app.use(express.json());

const postServiceEvents = 'http://localhost:4000/events';
const commentServiceEvents = 'http://localhost:4001/events';
const queryServiceEvents = 'http://localhost:4002/events';

app.post('/events', async (request, response) => {
	const event = request.body;

	console.log(event);

	try {
		axios.post(`${postServiceEvents}`, event);
		axios.post(`${commentServiceEvents}`, event);
		axios.post(`${queryServiceEvents}`, event);

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
