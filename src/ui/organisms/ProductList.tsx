import { ProductsDocument } from "../../../generated/graphql";
import { getClient } from "../../lib/ApolloClient";
import { ProductListItem } from "../molecules/ProductListItem";

export const ProductList = async () => {
	const client = getClient();

	const { data } = await client.query({
		query: ProductsDocument,
		context: {
			fetchOptions: {
				next: { revalidate: 0 },
			},
		},
	});

	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{data.products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
};
