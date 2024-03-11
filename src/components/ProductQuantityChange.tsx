"use client";

import { useOptimistic } from "react";
import { changeProductQuantityAction } from "@/actions";

export function ProductQuantityChange({
	cartId,
	productId,
	quantity,
}: {
	cartId: string;
	productId: string;
	quantity: number;
}) {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => {
			return newQuantity;
		},
	);

	return (
		<form>
			<span className="mr-4" data-testid="quantity">
				{optimisticQuantity}
			</span>
			<button
				disabled={optimisticQuantity === 1}
				data-testid="decrement"
				className="mr-1 h-6 w-6 border disabled:bg-slate-100 "
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeProductQuantityAction(cartId, productId, optimisticQuantity - 1);
				}}
			>
				-
			</button>
			<button
				data-testid="increment"
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeProductQuantityAction(cartId, productId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
}
