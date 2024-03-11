import React from "react";
import { getCartIdFromCookies } from "@/utils/getCartIdFromCookies";
import { getCartById } from "@/graphql-services/getCartById";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const CartIcon = async () => {
	const cartId = getCartIdFromCookies();

	const cart = await getCartById(cartId || "");

	const quantityTotal =
		cart?.items.reduce((acc, item) => {
			return acc + item.quantity;
		}, 0) || 0;

	return <ActiveLink href="/cart">Cart ({quantityTotal})</ActiveLink>;
};
