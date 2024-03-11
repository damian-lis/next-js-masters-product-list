"use server";

import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { removeProductFromCart } from "./graphql-services/removeProductFromCart";
import { getCartIdFromCookies } from "./utils/getCartIdFromCookies";
import { getCartById } from "./graphql-services/getCartById";
import { removeCartIdFromCookies } from "./utils/removeCartIdFromCookies";
import { createReview } from "./graphql-services/createReview";
import { type ProductReviewFragment } from "./graphql/generated/graphql";
import { changeProductQuantity } from "./graphql-services/changeProductQuantity";

export const createReviewAction = async ({
	author,
	description,
	email,
	productId,
	rating,
	title,
}: Omit<ProductReviewFragment, "id"> & { productId: string }) => {
	await createReview({
		author,
		description,
		email,
		productId,
		rating,
		title,
	});
	revalidateTag("product");
};

export const changeProductQuantityAction = async (
	cartId: string,
	productId: string,
	quantity: number,
) => {
	await changeProductQuantity(cartId, productId, quantity);
	revalidateTag("cart");
};

export const removeProductFromCartAction = async (cartId: string, productId: string) => {
	await removeProductFromCart(cartId, productId);
};

export const handlePaymentAction = async () => {
	const cartId = getCartIdFromCookies();

	if (!cartId) return;

	const cart = await getCartById(cartId);

	if (!cart) return;

	const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

	if (!STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const stripe = new Stripe(STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.items.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.product.name,
				},
				unit_amount: item.product.price,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: "http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "http://localhost:3000/cart/cancel",
	});

	if (!checkoutSession.url) throw new Error("Something went wrong");

	removeCartIdFromCookies();
	redirect(checkoutSession.url);
};
