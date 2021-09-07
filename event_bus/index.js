const express = require('express');

const axios = require('axios');

const app = express();

app.use(express.json());

const postServiceEvents = 'http://localhost:4000/events';
const commentServiceEvents = 'http://localhost:4001/events';
const queryService = 'http://localhost:4002/events';

app.post('/events', (request, response) => {
	const event = request.body;

	axios.post(`${postServiceEvents}`, event);
	axios.post(`${commentServiceEvents}`, event);
	axios.post(`${queryService}`, event);

	response.send({ status: 'OK' });
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => console.log(`EVENT BUS RUNNING ON PORT ${PORT}`));
