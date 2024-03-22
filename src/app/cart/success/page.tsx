import { redirect } from "next/navigation";
import React from "react";
import Stripe from "stripe";
import { completeCart } from "@/graphql-services/completeCart";
import { formatMoney } from "@/ui/utils";

const CartSuccessPage = async ({ searchParams }: { searchParams: { sessionId: string } }) => {
	if (!searchParams.sessionId) redirect("/");

	const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

	if (!STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const stripe = new Stripe(STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(searchParams.sessionId);
	const cartId = session.metadata?.cartId;
	const customerEmail = session.customer_details?.email;

	if (!cartId || !customerEmail) return "Something went wrong...";

	const cartComplete = await completeCart(cartId, customerEmail);

	if (!cartComplete) return "No order";

	const order = cartComplete.cartComplete;

	return (
		<section className="mx-auto mt-5 w-full max-w-3xl overflow-x-auto ">
			<table className="w-full text-left text-sm">
				<thead className="border text-xs uppercase dark:border-gray-700 ">
					<tr>
						<th scope="col" className="min-w-32 px-4 py-3">
							Order ID
						</th>
						<th scope="col" className="min-w-40 px-4 py-3">
							Customer Email
						</th>
						<th scope="col" className="px-4 py-3">
							Payment Status
						</th>
						<th scope="col" className="px-4 py-3">
							Order Status
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border dark:border-gray-700 ">
						<td className="px-4 py-4">{order.id}</td>
						<td className="px-4 py-4">{customerEmail}</td>
						<td className="px-4 py-4">{session.payment_status}</td>
						<td className="px-4 py-4">{order.status}</td>
					</tr>
				</tbody>
			</table>
			<table className="mt-4 w-full text-left text-sm">
				<thead className="border text-xs uppercase dark:border-gray-700 ">
					<tr>
						<th scope="col" className="min-w-32 px-4 py-3">
							Product ID
						</th>
						<th scope="col" className="min-w-40 px-4 py-3">
							Product Name
						</th>
						<th scope="col" className="px-4 py-3">
							Quantity
						</th>
						<th scope="col" className="px-4 py-3">
							Price
						</th>
					</tr>
				</thead>
				<tbody>
					{(order.lines as OrderLine[]).map((line) => (
						<tr key={line.productId} className="border dark:border-gray-700">
							<td className="px-4 py-4">{line.productId}</td>
							<td className="px-4 py-4">{line.productName}</td>
							<td className="px-4 py-4">{line.productQuantity}</td>
							<td className="px-4 py-4">{formatMoney(line.productPrice)}</td>
						</tr>
					))}
					<tr className="border dark:border-gray-700 ">
						<td className="px-4 py-4" />
						<td className="px-4 py-4" />
						<td className="px-4 py-4 text-right font-bold">Total Amount:</td>
						<td className="px-4 py-4">{formatMoney(order.totalAmount)}</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default CartSuccessPage;

type OrderLine = {
	cartId: string;
	productQuantity: number;
	productId: string;
	productName: string;
	productSlug: string;
	productPrice: number;
};
