import { CollectionAndCategoryhGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCollectionAndCategoryBySlug = async (slug: string) => {
	const collectionAndCategory = await executeGraphql({
		query: CollectionAndCategoryhGetDocument,
		variables: {
			slug,
		},
	});

	return collectionAndCategory;
};
