import { CartFindOrCreateDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const findOrCreateCart = async (cartId?: string) => {
	const cart = await executeGraphql({
		query: CartFindOrCreateDocument,
		variables: {
			id: cartId,
		},
		cache: "no-store",
	});

	if (!cart.cartFindOrCreate.id) {
		throw new Error("Find or create cart failed");
	}

	return cart.cartFindOrCreate;
};
