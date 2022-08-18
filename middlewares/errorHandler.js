function logErrors(err, req, res, next) {
	// eslint-disable-next-line no-console
	console.error(err);
	next(err);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
	return res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		return res.status(output.statusCode).json(output.payload);
	} else {
		next(err);
	}
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
