import React from "react";
import { formatMoney } from "../utils";
import { type ProductDetailsFragment } from "@/graphql/generated/graphql";

type ProductListItemDescriptionProps = {
	product: Pick<ProductDetailsFragment, "name" | "categories" | "price">;
};

export const ProductListItemDescription = ({
	product: { name, categories, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-3 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-gray-700">{name}</h3>
				{!!categories[0]?.name && (
					<p className="text-sm text-gray-500">
						<span className="sr-only">Kategoria:</span>
						{categories[0]?.name}
					</p>
				)}
			</div>
			<p data-testid="product-price" className="text-sm font-medium text-gray-900">
				{formatMoney(price / 100)}
			</p>
		</div>
	);
};
