import React, { Suspense } from "react";

import { getCartIdFromCookies } from "@/utils/getCartIdFromCookies";
import { getCartById } from "@/graphql-services/getCartById";
import { formatMoney } from "@/ui/utils";
import { ProductQuantityChange } from "@/components/ProductQuantityChange";
import { RemoveFromCartButton } from "@/components/RemoveFromCartButton";
import { handlePaymentAction } from "@/actions";

const Cart = async () => {
	const cartId = getCartIdFromCookies();

	if (!cartId) return <div className="text-center">No cart.</div>;

	const cart = await getCartById(cartId);

	if (!cart) return <div className="text-center">No cart.</div>;

	if (!cart.items.length) return <div className="text-center">No items.</div>;

	const totalPrice = cart.items.reduce((acc, item) => {
		return acc + item.product.price * item.quantity;
	}, 0);

	const totalQuantity = cart.items.reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);

	return (
		<>
			<section className="mx-auto mt-5 w-full max-w-3xl overflow-x-auto ">
				<table className="w-full text-left text-sm">
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
							<th scope="col" className="px-4 py-3" />
						</tr>
					</thead>
					<tbody>
						{cart.items.map((item, index) => (
							<tr key={index} className="border dark:border-gray-700 ">
								<td className="px-4 py-4">{item.product.id}</td>
								<td className="px-4 py-4">{item.product.name}</td>
								<td className="min-w-32 px-4 py-4">
									<ProductQuantityChange
										quantity={item.quantity}
										cartId={cart.id}
										productId={item.product.id}
									/>
								</td>
								<td className="px-4 py-4">{formatMoney(item.product.price)}</td>
								<td className="px-4 py-4">
									<Suspense>
										<RemoveFromCartButton cartId={cart.id} productId={item.product.id} />
									</Suspense>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<table className="ml-auto mt-4 text-sm">
					<tbody>
						<tr className="border dark:border-gray-700 ">
							<td className="px-4 py-4">TOTAL PRICE:</td>
							<td className="px-4 py-4 ">{formatMoney(totalPrice)}</td>
						</tr>
						<tr className="border dark:border-gray-700 ">
							<td className="px-4 py-4">TOTAL QUANTITY:</td>
							<td className="px-4 py-4 ">{totalQuantity}</td>
						</tr>
					</tbody>
				</table>
			</section>
			<form className="mx-auto w-full max-w-3xl text-right" action={handlePaymentAction}>
				<button className="mt-4 w-full max-w-40  rounded-md border bg-slate-950 p-2 text-white shadow-sm transition-colors hover:bg-slate-700">
					Pay
				</button>
			</form>
		</>
	);
};

export default Cart;
