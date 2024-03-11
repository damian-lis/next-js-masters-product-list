import { CartCompleteDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const completeCart = async (cartId: string, userEmail: string) => {
	const cartCompleted = await executeGraphql({
		query: CartCompleteDocument,
		variables: {
			cartId,
			userEmail,
		},
	});

	return cartCompleted;
};
