import { ProductDocument } from "../../../../generated/graphql";
import { getClient } from "@/lib/ApolloClient";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
	const client = getClient();

	const { data } = await client.query({
		query: ProductDocument,
		variables: {
			productId: params.productId,
		},
		context: {
			fetchOptions: {
				next: { revalidate: 0 },
			},
		},
	});

	const product = data.product;

	if (!product) return "No product at given ID!";

	return (
		<article className="cursor-pointer rounded border p-2 transition-transform hover:scale-105">
			<ProductListItemCoverImage src={product.coverImgUrl} alt={product.name} />
			<ProductListItemDescription product={product} />
		</article>
	);
};

export default ProductPage;
