const express = require('express');

const axios = require('axios');

const app = express();

app.use(express.json());
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

const postServiceEvents = 'http://127.0.0.1:4000/events';
const commentServiceEvents = 'http://127.0.0.1:4001/events';
const queryServiceEvents = 'http://127.0.0.1:4002/events';
const moderationServiceEvents = 'http://127.0.0.1:4003/events';

app.post('/events', (request, response) => {
	const event = request.body;

	axios
		.post(`${postServiceEvents}`, event)
		.catch((err) => console.log(err.message));
	axios
		.post(`${commentServiceEvents}`, event)
		.catch((err) => console.log(err.message));
	axios
		.post(`${queryServiceEvents}`, event)
		.catch((err) => console.log(err.message));
	axios
		.post(`${moderationServiceEvents}`, event)
		.catch((err) => console.log(err.message));

	response.send({ status: 'OK' });
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => console.log(`EVENT BUS RUNNING ON PORT ${PORT}`));
