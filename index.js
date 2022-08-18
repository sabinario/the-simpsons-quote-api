const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/v1/quotes', (req, res) => {
	res.json({
		msg: 'app its working',
	});
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`listening on port: ${port}`);
});
