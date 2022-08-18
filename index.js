const express = require('express');
const cors = require('cors');
const {
	logErrors,
	errorHandler,
	boomErrorHandler,
} = require('./middlewares/errorHandler');

const appRouter = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ['https://the-simpsons-quote-app.vercel.app'];

const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Unauthorized'));
		}
	},
};
app.use(cors(options));
appRouter(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`listening on port: ${port}`);
});
