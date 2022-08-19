const { Router, json } = require('express');
const { nanoid } = require('nanoid');

const quoteService = require('../services/quotes.service');

const quotesRouter = Router();

quotesRouter.use(json());

quotesRouter.get('/', getQuote);
quotesRouter.get('/search', getQuotesByCharacter);
quotesRouter.get('/character', getQuotesByCharacter);

async function getQuote(req, res, next) {
	try {
		const quotes = await quoteService.getQuote();
		const { quote, character, image, characterDirection } = quotes;
		const data = {
			quote,
			character,
			image,
			characterDirection,
			id: nanoid(8),
		};
		res.json([data]);
	} catch (error) {
		next(error);
	}
}

async function getQuotesByCharacter(req, res, next) {
	const { amount, name } = req.query;

	try {
		const response = await quoteService.getQuotesByCharacter(name, amount);

		if (amount) {
			const data = [];
			response.map((res) => {
				const { quote, character, image, characterDirection } = res;
				data.push({
					quote,
					character,
					image,
					characterDirection,
					id: nanoid(8),
				});
			});
			return res.json(data);
		}

		const { quote, character, image, characterDirection } = response[0];
		const data = {
			quote,
			character,
			image,
			characterDirection,
			id: nanoid(8),
		};

		res.json([data]);
	} catch (error) {
		next(error);
	}
}

/* async function getQuoteByCharacter(req, res, next) {
	try {
		const { name } = req.params;
		const quotesBy = await quoteService.getQuotesByCharacter(name);

		const { quote, character, image, characterDirection } = quotesBy;
		const data = {
			quote,
			character,
			image,
			characterDirection,
			id: nanoid(8),
		};

		res.json([data]);
	} catch (error) {
		next(error);
	}
} */

module.exports = quotesRouter;
