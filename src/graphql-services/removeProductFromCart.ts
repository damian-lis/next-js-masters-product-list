import { CartProductRemoveDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const removeProductFromCart = async (cartId: string, productId: string) => {
	const cart = await executeGraphql({
		query: CartProductRemoveDocument,
		variables: {
			id: cartId,
			productId,
		},
		cache: "no-store",
	});

	return cart;
};
