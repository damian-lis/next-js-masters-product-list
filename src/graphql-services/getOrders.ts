import { OrdersGetDocument } from "@/graphql/generated/graphql";
import { executeGraphql } from "@/utils/executeGraphql";

export const getOrders = async (email: string) => {
	const { orders } = await executeGraphql({
		query: OrdersGetDocument,
		variables: {
			email,
		},
		cache: "no-cache",
	});

	return orders.data;
};
