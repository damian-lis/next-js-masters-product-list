import { type Metadata } from "next";
import { getProductById, getProductList } from "@/api/products";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: [product.coverImage.src],
		},
	};
};

export const generateStaticParams = async () => {
	const products = await getProductList();
	return products.map((product) => ({ productId: product.id }));
};

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductById(params.productId);

	return (
		<article className="m-auto mb-10 max-w-xs">
			<h1 className="mb-3 text-center">{product.name}</h1>
			<ProductListItemCoverImage {...product.coverImage} />
			<p>{product.description}</p>
		</article>
	);
};

export default ProductPage;
