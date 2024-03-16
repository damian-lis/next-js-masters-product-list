import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { cookies } from "next/headers";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { getProductById } from "@/graphql-services/getProductById";
import { getProducts } from "@/graphql-services/getProducts";
import { formatToSlug } from "@/utils/formatToSlug";
import { findOrCreateCart } from "@/graphql-services/findOrCreateCart";
import { addProductToCart } from "@/graphql-services/addProductToCart";
import { getCartIdFromCookies } from "@/utils/getCartIdFromCookies";
import { ProductReview } from "@/components/ProductReview";
import { StyledFormSubmitButton } from "@/ui/atoms/StyledFormSubmitButton";
import { getCartById } from "@/graphql-services/getCartById";
import { changeProductQuantityAction } from "@/actions";
import { ProductDetails } from "@/ui/molecules/ProductDetails";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	if (!product) return {};

	return {
		title: product.name,
		description: product.description,
		// open graph settings are set in openagraph-image.tsx in the product folder
	};
};

export const generateStaticParams = async () => {
	const { products } = await getProducts();
	return products.map((product) => ({ productId: product.id }));
};

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductById(params.productId);
	const categorySlug = formatToSlug(product?.categories[0]?.name);

	if (!product) throw notFound();

	async function addToCartAction() {
		"use server";

		const cartIdFromCookies = getCartIdFromCookies();
		const cart = await findOrCreateCart(cartIdFromCookies);

		cookies().set("cartId", cart.id, {
			httpOnly: true,
			sameSite: "lax",
		});

		const cartData = await getCartById(cart.id);

		const productAlreadyInCart = cartData?.items.find(
			(item) => item.product.id === params.productId,
		);

		if (productAlreadyInCart) {
			await changeProductQuantityAction(
				cart.id,
				params.productId,
				productAlreadyInCart.quantity + 1,
			);
			return;
		}

		await addProductToCart(cart.id, { productId: params.productId, quantity: 1 });
	}

	return (
		<>
			<article className="m-auto mb-10 max-w-xs">
				<ProductDetails product={product} />
				<form action={addToCartAction}>
					<StyledFormSubmitButton data-testid="add-to-cart-button">
						Add to cart
					</StyledFormSubmitButton>
				</form>
			</article>
			<section>
				<Suspense>
					{!!categorySlug && (
						<RelatedProducts productIdToSkip={product.id} categorySlug={categorySlug} />
					)}
				</Suspense>
			</section>
			<ProductReview productId={params.productId} reviews={product.reviews} />
		</>
	);
};

export default ProductPage;
