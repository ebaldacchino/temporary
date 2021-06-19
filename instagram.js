const axios = require('axios');

const myId = '5929228902';
const fitNfocusedId = '619232183';
const url = `https://www.instagram.com/graphql/query/?query_hash=7ea6ae3cf6fb05e73fcbe1732b1d2a42&variables={"id":"${myId}","first":6}`;

const cache = {
	lastFetch: 0,
	posts: [],
};

const getPosts = async () => {
	const timeSinceLastFetch = Date.now() - cache.lastFetch;

	const oneWeek = 1000 * 60 * 60 * 24 * 7;

	if (timeSinceLastFetch <= oneWeek) {
		return cache.posts;
	}

	const { data } = await axios.get(url);

	const posts = data.data.user.edge_owner_to_timeline_media.edges;
	cache.lastFetch = Date.now();
	cache.posts = posts;

	const formattedPosts = posts.map(
		({ node: { id, display_url, shortcode } }) => {
			return {
				id,
				img: display_url,
				url: `https://www.instagram.com/p/${shortcode}`,
			};
		}
	);
	return formattedPosts;
};

exports.handler = async (event, context) => {
	const posts = await getPosts();
	return {
		statusCode: 200,
		body: JSON.stringify(posts),
	};
};
