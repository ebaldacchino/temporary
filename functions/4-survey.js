// domain/.netlify/functions/1-hello

const headers = {
	'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event, context) => {
	return {
		headers,
		statusCode: 200,
		body: 'Our First Netlify Function Example',
	};
};
