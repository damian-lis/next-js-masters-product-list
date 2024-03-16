import { CollectionCategoryProductsSearchDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const searchCollectionCategoryProductsBySlug = async (slug: string) => {
	const response = await executeGraphql({
		query: CollectionCategoryProductsSearchDocument,
		variables: {
			slug,
		},
	});

	return response;
};
