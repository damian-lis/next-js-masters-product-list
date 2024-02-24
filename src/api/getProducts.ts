import { ProductsGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getProducts = async ({ count = 10, currentPage = 1 } = {}) => {
	const { products } = await executeGraphql(ProductsGetDocument, {
		take: count,
		skip: count * (currentPage - 1),
	});

	return { products: products.data, productsTotal: products.meta.total };
};
