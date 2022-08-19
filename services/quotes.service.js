const axios = require('axios');
const boom = require('@hapi/boom');

class QuotesService {
	async getQuote() {
		const response = await axios.get(
			'https://thesimpsonsquoteapi.glitch.me/quotes'
		);
		return response.data[0];
	}

	async getQuoteByCharacther(character) {
		const response = await axios.get(
			`https://thesimpsonsquoteapi.glitch.me/quotes?character=${character}`
		);
		if (response.data.length === 0) {
			throw boom.notFound('There are no quotes');
		}
		return response.data[0];
	}

	async getQuotesByCharacter(character, amount = 1) {
		const response = await axios.get(
			`https://thesimpsonsquoteapi.glitch.me/quotes?count=${amount}&character=${character}`
		);

		if (response.data.length === 0) {
			throw boom.notFound('There are no quotes');
		}
		return response.data;
	}
}

module.exports = new QuotesService();
