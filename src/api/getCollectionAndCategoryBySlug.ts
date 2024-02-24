import { CollectionAndCategoryhGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCollectionAndCategoryBySlug = async (slug: string) => {
	const collectionAndCategory = await executeGraphql(CollectionAndCategoryhGetDocument, {
		slug,
	});

	return collectionAndCategory;
};
