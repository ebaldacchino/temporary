const heading = document.querySelector('.title');
const result = document.querySelector('.result');
const create = (x) => document.createElement(x);

const fetchData = async () => {
	try {
		// const {
		// 	data: { description, name, price, url },
		// } = await axios.get(`/api/3-product${window.location.search}`);
		const {
			data: { description, name, price, url },
		} = await axios.get(`/api/3-complete${window.location.search}`);

		const article = create('article');
		article.className = 'product';

		const img = create('img');
		img.className = 'product-img';
		img.src = url;
		img.alt = name;

		const info = create('div');
		info.className = 'product-info';

		const title = create('h5');
		title.className = 'title';
		title.textContent = name;

		const priceEl = create('h5');
		priceEl.className = 'price';
		priceEl.textContent = '$' + price;

		const desc = create('p');
		desc.className = 'desc';
		desc.textContent = description;

		info.appendChild(title);
		info.appendChild(priceEl);
		info.appendChild(desc);

		article.appendChild(img);
		article.appendChild(info);

		heading.textContent = name;
		result.appendChild(article);
	} catch (error) {
		heading.remove();
		const errorMessage = create('h2');
		errorMessage.textContent = error.response.data;
		result.appendChild(errorMessage);
	}
};

fetchData();
