import { ProductsByCategoryGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getProductsByCategorySlug = async (slug: string) => {
	const { category } = await executeGraphql(ProductsByCategoryGetDocument, {
		slug: slug,
	});

	return category?.products;
};
