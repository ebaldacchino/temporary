const result = document.querySelector('.result');
const create = (x) => document.createElement(x);
const fetchData = async () => {
	try {
		// const { data } = await axios.get('/api/3-airtable'); 
		const { data } = await axios.get('/api/3-complete'); 
		result.children[0].remove();
		data.map((product) => {
			const a = create('a');
			a.href = `product.html?id=${product.id}`;
			a.className = 'product';

			const img = create('img');
			img.src = product.url;
			img.alt = product.name;

			const info = create('div');
			info.className = 'info';

			const title = create('h5');
			title.textContent = product.name;

			const price = create('h5');
			price.textContent = '$' + product.price;

			info.appendChild(title);
			info.appendChild(price);

			a.appendChild(img);
			a.appendChild(info);

			result.appendChild(a);
		});
	} catch (error) {
		console.log(error);
	}
};

fetchData();
