require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({
	apiKey: process.env.AIRTABLE_API_KEY,
})
	.base('appsq1gpVNTzcHyew')
	.table('products');

const headers = {
	'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event, context) => {
	try {
		const { records } = await airtable.list();
		const products = records.map((product) => {
			const { fields, id } = product;
			const { name, image, price } = fields;
			const url = image[0].url;
			return { id, name, url, price };
		});
		return { headers, statusCode: 200, body: JSON.stringify(products) };
	} catch (error) {
		return { headers, statusCode: 500, body: 'Server Error' };
	}
};
