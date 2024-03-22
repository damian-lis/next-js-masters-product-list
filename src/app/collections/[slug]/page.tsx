import React from "react";
import { getCollectionBySlug } from "@/graphql-services/getCollectionBySlug";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCollections } from "@/graphql-services/getCollections";
import { Heading } from "@/ui/atoms/Heading";

export const metadata = {
	title: "Collections",
};

export const generateStaticParams = async () => {
	const { collections } = await getCollections();
	return collections.map((collection) => ({ slug: collection.name }));
};

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
	const collection = await getCollectionBySlug(params.slug);

	return (
		<section className="mt-16">
			<Heading asSubHeading>Choosen collection: {collection?.name}</Heading>
			<ProductList products={collection?.products} />
		</section>
	);
};

export default CollectionPage;
