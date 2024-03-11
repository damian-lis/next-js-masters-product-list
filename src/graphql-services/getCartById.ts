import { CartGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getCartById = async (id: string) => {
	const { cart } = await executeGraphql({
		query: CartGetDocument,
		variables: { id },
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});

	return cart;
};
