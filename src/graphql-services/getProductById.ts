import { ProductGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getProductById = async (id: string) => {
	const { product } = await executeGraphql({
		query: ProductGetDocument,
		variables: { id },
		next: {
			revalidate: 1,
			tags: ["product"],
		},
	});

	return product;
};
