const result = document.querySelector('.result');
const create = (x) => document.createElement(x);

const fetchData = async () => {
	try {
		result.children[0].remove();
		const { data } = await axios.get('/api/2-basic-api');
		if (data) {
			data.map((product) => {
				const {
					image: { url },
					name,
					price,
				} = product;
				const article = create('article');
				article.className = 'product';

				const img = create('img');
				img.src = url;
				img.alt = name;

				const info = create('div');
				info.className = 'info';

				const title = create('h5');
				title.textContent = name;
				const cost = create('h5');
				cost.textContent = '$' + price;

				info.appendChild(title);
				info.appendChild(cost);

				article.appendChild(img);
				article.appendChild(info);
				result.appendChild(article);
			});
		}
	} catch (error) {
		console.log(error.response); 
		const h4 = create('h4');
		h4.textContent = 'There was an error. Please try again later';
		result.appendChild(h4);
	}
};

fetchData();
