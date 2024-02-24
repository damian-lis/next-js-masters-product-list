import { ProductListItem } from "../molecules/ProductListItem";
import { type ProductDetailsFragment } from "@/graphql/generated/graphql";

type ProductListProps = {
	products?: ProductDetailsFragment[];
};

export const ProductList = async ({ products }: ProductListProps) => {
	return (
		<ul
			data-testid="products-list"
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{products?.map((product) => <ProductListItem key={product.id} product={product} />)}
		</ul>
	);
};
