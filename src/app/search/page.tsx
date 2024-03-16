import React from "react";

import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Heading } from "@/ui/atoms/Heading";
import { formatToSlug } from "@/utils/formatToSlug";
import { searchCollectionCategoryProductsBySlug } from "@/graphql-services/searchCollectionCategoryProductBySlug";
import { ProductList } from "@/ui/organisms/ProductList";

const page = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
	const data = await searchCollectionCategoryProductsBySlug(formatToSlug(query)!);

	const categoryName = data.category?.name;
	const collectionName = data.collection?.name;
	const products = data.products?.data;

	return (
		<>
			<Heading>Results:</Heading>
			<section className="text-center">
				{categoryName || categoryName || products?.length ? (
					<>
						{categoryName && (
							<ActiveLink href={`/categories/${formatToSlug(categoryName)}/1`}>
								Category: {categoryName}
							</ActiveLink>
						)}
						{collectionName && (
							<ActiveLink href={`/collections/${formatToSlug(collectionName)}`}>
								Collection: {collectionName}
							</ActiveLink>
						)}
						{products.length && <ProductList products={products} />}
					</>
				) : (
					"No Results"
				)}
			</section>
		</>
	);
};

export default page;
