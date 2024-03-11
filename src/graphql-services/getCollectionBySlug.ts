import { CollectionGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCollectionBySlug = async (slug: string) => {
	const { collection } = await executeGraphql({
		query: CollectionGetDocument,
		variables: {
			slug,
		},
	});

	return collection;
};
