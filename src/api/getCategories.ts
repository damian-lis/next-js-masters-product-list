import { CategoriesGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCategories = async ({ count = 10, currentPage = 1 } = {}) => {
	const { categories } = await executeGraphql(CategoriesGetDocument, {
		take: count * currentPage,
		skip: count * (currentPage - 1),
	});

	return { categories: categories.data, categoriesTotal: categories.meta.total };
};
