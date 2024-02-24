import { CategoryGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCategoryBySlug = async (slug: string) => {
	const { category } = await executeGraphql(CategoryGetDocument, {
		slug,
	});

	return category;
};
