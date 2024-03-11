import { ImageResponse } from "next/og";
import React from "react";
import { getProductById } from "@/graphql-services/getProductById";

export const runtime = "edge";
export const contetType = "image/png";
export const size = {
	width: 1200,
	height: 630,
};

const OpenGraphImage = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductById(params.productId);
	if (!product) return null;

	return new ImageResponse(
		(
			<div
				style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
			>
				<p>{product.name}</p>
				{<p>{product.description}</p>}
				{!!product.categories[0]?.name && <p>{product.categories[0]?.name}</p>}
				{!!product.images[0]?.url && (
					/* eslint-disable @next/next/no-img-element */
					<img width={400} src={product.images[0]?.url} alt={product.name} />
				)}
			</div>
		),
		{ ...size },
	);
};

export default OpenGraphImage;
