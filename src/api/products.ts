type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductList = async ({ productCount = 20, pageNumber = 1 } = {}) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${productCount}&offset=${pageNumber}`,
	);
	const productsResponse = (await res.json()) as ProductResponseItem[];

	const products = productsResponse.map((product) => ({
		id: product.id,
		name: product.title,
		category: product.category,
		price: product.price,
		description: product.description,
		coverImage: {
			alt: product.title,
			src: product.image,
		},
	}));

	return products;
};

export const getProductById = async (id: ProductResponseItem["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const productResponse = (await res.json()) as ProductResponseItem;

	const product = {
		id: productResponse.id,
		name: productResponse.title,
		category: productResponse.category,
		price: productResponse.price,
		description: productResponse.description,
		coverImage: {
			alt: productResponse.title,
			src: productResponse.image,
		},
	};

	return product;
};
