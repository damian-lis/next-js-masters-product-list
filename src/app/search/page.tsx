import React from "react";

import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Heading } from "@/ui/atoms/Heading";
import { formatToSlug } from "@/utils/formatToSlug";
import { getCollectionAndCategoryBySlug } from "@/api/getCollectionAndCategoryBySlug";

const page = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
	const data = query ? await getCollectionAndCategoryBySlug(formatToSlug(query)!) : {};

	const categoryName = data.category?.name;
	const collectionName = data.collection?.name;

	return (
		<>
			<Heading>Results:</Heading>
			<section className="text-center">
				{categoryName || categoryName ? (
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
					</>
				) : (
					"No Results"
				)}
			</section>
		</>
	);
};

export default page;
