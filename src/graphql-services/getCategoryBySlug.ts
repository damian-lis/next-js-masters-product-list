import { CategoryGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCategoryBySlug = async (slug: string) => {
	const { category } = await executeGraphql({
		query: CategoryGetDocument,
		variables: {
			slug,
		},
	});

	return category;
};
