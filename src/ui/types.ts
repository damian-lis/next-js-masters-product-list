export type ProductListItemT = {
	id: string;
	category: string;
	name: string;
	price: number;
	coverImage: ProductListItemCoverImageT;
};

export type ProductListItemCoverImageT = {
	src: string;
	alt: string;
};
