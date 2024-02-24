import { ProductGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getProductById = async (id: string) => {
	const { product } = await executeGraphql(ProductGetDocument, { id });

	return product;
};
