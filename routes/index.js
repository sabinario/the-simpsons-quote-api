const { Router } = require('express');
const quotesRouter = require('./quotes.routes.js');

function appRouter(app) {
	const router = Router();
	app.use('/api/v1', router);

	router.use('/quote', quotesRouter);
}

module.exports = appRouter;
