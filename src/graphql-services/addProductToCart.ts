import { CartProductAddDocument, type MutationCartAddItemInput } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const addProductToCart = async (
	id: string,
	productData: MutationCartAddItemInput["item"],
) => {
	const cart = await executeGraphql({
		query: CartProductAddDocument,
		variables: {
			id,
			input: {
				item: productData,
			},
		},
		cache: "no-store",
	});

	return cart;
};
