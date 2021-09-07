const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4003;

app.post('/events', (req, res) => {
	console.log('Received Events', req.body.type);

	res.send({});
});

app.listen(PORT, () =>
	console.log(`MODERATION SERVICE LISTENING ON PORT ${PORT}`)
);
