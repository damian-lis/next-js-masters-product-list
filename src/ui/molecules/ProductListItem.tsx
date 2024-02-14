import Link from "next/link";
import { type ProductListItemT } from "../types";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";

type ProductListItemProps = {
	product: ProductListItemT;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article className="cursor-pointer rounded border p-2 transition-transform hover:scale-105">
					<ProductListItemCoverImage src={product.coverImgUrl} alt={product.name} />
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};

("https://damian-lis.eu.saleor.cloud/media/thumbnails/products/saleor-polo-shirt-back_thumbnail_1024.png");
