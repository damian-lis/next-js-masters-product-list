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
		<section>
			<h2>Order ID: {order.id}</h2>
			<h2>Customer Email: {customerEmail}</h2>
			<h2>Payment Status: {session.payment_status}</h2>
			<h2>Order Status: {order.status}</h2>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Product Id
							</th>
							<th scope="col" className="px-6 py-3">
								Product Name
							</th>
							<th scope="col" className="px-6 py-3">
								Quantity
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
						</tr>
					</thead>
					<tbody>
						{(order.lines as OrderLine[]).map((line) => (
							<tr
								key={line.productId}
								className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
							>
								<td className="px-6 py-4">{line.productId}</td>
								<td className="px-6 py-4">{line.productName}</td>
								<td className="px-6 py-4">{line.productQuantity}</td>
								<td className="px-6 py-4">${formatMoney(line.productPrice)}</td>
							</tr>
						))}
						<tr className="bg-gray-50 dark:bg-gray-700">
							<td className="px-6 py-4" />
							<td className="px-6 py-4" />
							<td className="px-6 py-4 text-right font-bold">Total Amount</td>
							<td className="px-6 py-4 font-bold">${formatMoney(order.totalAmount)}</td>
						</tr>
					</tbody>
				</table>
			</div>
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
