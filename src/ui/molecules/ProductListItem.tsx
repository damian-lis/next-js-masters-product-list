import Link from "next/link";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductDetailsFragment } from "@/graphql/generated/graphql";

type ProductListItemProps = {
	product: ProductDetailsFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	const roundedRating = product.rating ? Math.round(product.rating * 2) / 2 : undefined;

	return (
		<li className="relative">
			<p
				data-testid="product-rating"
				className="absolute right-0 top-0 w-10 rounded border bg-orange-50 p-2 text-center"
			>
				{roundedRating}
			</p>
			<Link href={`/product/${product.id}`}>
				<article className="cursor-pointer rounded border p-2 transition-transform hover:scale-105">
					{product.images[0]?.url && (
						<ProductListItemCoverImage src={product.images[0]?.url} alt={product.name} />
					)}
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
