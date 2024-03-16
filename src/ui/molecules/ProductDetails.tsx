import React from "react";
import { Heading } from "../atoms/Heading";
import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { type ProductDetailsFragment } from "@/graphql/generated/graphql";

export const ProductDetails = ({ product }: { product: ProductDetailsFragment }) => {
	return (
		<div>
			<Heading>{product.name}</Heading>
			{!!product.images[0]?.url && (
				<ProductListItemCoverImage src={product.images[0]?.url} alt={product.name} />
			)}
			<p className="mt-3">{product.description}</p>
		</div>
	);
};
