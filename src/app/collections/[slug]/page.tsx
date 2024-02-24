import React from "react";
import { getCollectionBySlug } from "@/api/getCollectionBySlug";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCollections } from "@/api/getCollections";
import { Heading } from "@/ui/atoms/Heading";

export const generateStaticParams = async () => {
	const { collections } = await getCollections();
	return collections.map((collection) => ({ collectionName: collection.name }));
};

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
	const collection = await getCollectionBySlug(params.slug);

	return (
		<section>
			<Heading>Collection name: {collection?.name}</Heading>
			<ProductList products={collection?.products} />
		</section>
	);
};

export default CollectionPage;
