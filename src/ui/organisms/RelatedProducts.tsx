import React from "react";
import { Heading } from "../atoms/Heading";
import { ProductList } from "./ProductList";
import { getProductsByCategorySlug } from "@/graphql-services/getProductsByCategorySlug";

export const RelatedProducts = async ({
	categorySlug,
	productIdToSkip,
}: {
	productIdToSkip: string;
	categorySlug: string;
}) => {
	const productsByCategory = await getProductsByCategorySlug(categorySlug);
	const preparedProductsByCategory = productsByCategory
		?.filter((product) => product.id !== productIdToSkip)
		.slice(0, 4); // it is sliced because there is no 'take' query parameter in the products field inside the category one

	return (
		<section data-testid="related-products">
			<Heading asSubHeading>Related Products in the {categorySlug} category:</Heading>
			<ProductList products={preparedProductsByCategory} />
		</section>
	);
};
