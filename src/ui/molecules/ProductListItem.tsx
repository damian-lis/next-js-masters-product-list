import { type ProductListItemT } from "../types";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductListItemT;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<article className="cursor-pointer rounded border p-2 transition-transform hover:scale-105">
				<ProductListItemCoverImage {...product.coverImage} />
				<ProductListItemDescription product={product} />
			</article>
		</li>
	);
};

("https://damian-lis.eu.saleor.cloud/media/thumbnails/products/saleor-polo-shirt-back_thumbnail_1024.png");
