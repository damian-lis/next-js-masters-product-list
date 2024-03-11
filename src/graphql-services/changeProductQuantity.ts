import { CartItemQuantityChangeDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const changeProductQuantity = async (
	cartId: string,
	productId: string,
	quantity: number,
) => {
	const cart = await executeGraphql({
		query: CartItemQuantityChangeDocument,
		variables: {
			id: cartId,
			productId,
			quantity,
		},
		cache: "no-store",
	});

	return cart;
};
