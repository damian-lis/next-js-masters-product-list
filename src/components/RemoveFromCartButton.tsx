"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeProductFromCartAction } from "@/actions";

export const RemoveFromCartButton = ({
	cartId,
	productId,
}: {
	cartId: string;
	productId: string;
}) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<button
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeProductFromCartAction(cartId, productId);
					router.refresh();
				});
			}}
		>
			{isPending ? "Removing" : "Remove"}
		</button>
	);
};
