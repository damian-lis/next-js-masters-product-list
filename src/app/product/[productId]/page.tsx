import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { getProductById } from "@/api/getProductById";
import { getProducts } from "@/api/getProducts";
import { Heading } from "@/ui/atoms/Heading";
import { formatToSlug } from "@/utils/formatToSlug";

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
		openGraph: {
			title: product.name,
			description: product.description,
			images: [product.images[0]?.url || ""],
		},
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

	return (
		<>
			<article className="m-auto mb-10 max-w-xs">
				<Heading>{product.name}</Heading>
				{!!product.images[0]?.url && (
					<ProductListItemCoverImage src={product.images[0]?.url} alt={product.name} />
				)}
				<p className="mt-3">{product.description}</p>
			</article>
			<section>
				<Suspense>
					{!!categorySlug && (
						<RelatedProducts productIdToSkip={product.id} categorySlug={categorySlug} />
					)}
				</Suspense>
			</section>
		</>
	);
};

export default ProductPage;
