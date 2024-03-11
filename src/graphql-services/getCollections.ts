import { CollectionsGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCollections = async ({ count = 10, currentPage = 1 } = {}) => {
	const { collections } = await executeGraphql({
		query: CollectionsGetDocument,
		variables: {
			take: count * currentPage,
			skip: count * (currentPage - 1),
		},
	});

	return { collections: collections.data, collectionsTotal: collections.meta.total };
};
