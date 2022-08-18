const { Router, json } = require('express');
const axios = require('axios');
const boom = require('@hapi/boom');

const quoteService = require('../services/quotes.service');

const quotesRouter = Router();

quotesRouter.use(json());

quotesRouter.get('/', getQuote);
// quotesRouter.get('/:amount', getQuotes);
quotesRouter.get('/character/:character', getQuoteByCharacter);

async function getQuote(req, res, next) {
	try {
		const quotes = await quoteService.getQuote();
		res.json(quotes);
	} catch (error) {
		next(error);
	}
}

/* async function getQuotes(req, res) {
	const { amount } = req.params;
	console.log('amount: ', amount);
	try {
		const response = await axios.get(
			`https://thesimpsonsquoteapi.glitch.me/quotes?count=${amount}`
		);
		res.json(response.data);
	} catch (error) {
		console.error(error);
	}
} */

async function getQuoteByCharacter(req, res, next) {
	try {
		const { character } = req.params;

		const quotesBy = await quoteService.getQuoteByCharacther(character);
		res.json(quotesBy);
	} catch (error) {
		next(error);
	}
}

module.exports = quotesRouter;
