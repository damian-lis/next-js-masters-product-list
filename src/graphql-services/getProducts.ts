import { type ProductSortBy, ProductsGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getProducts = async ({
	count = 10,
	currentPage = 1,
	orderBy = "NAME" as ProductSortBy,
} = {}) => {
	const { products } = await executeGraphql({
		query: ProductsGetDocument,
		variables: {
			take: count,
			skip: count * (currentPage - 1),
			orderBy,
		},
		next: {
			revalidate: 1,
		},
	});

	return { products: products.data, productsTotal: products.meta.total };
};
