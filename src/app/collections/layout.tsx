import { getCollections } from "@/graphql-services/getCollections";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Heading } from "@/ui/atoms/Heading";
import { formatToSlug } from "@/utils/formatToSlug";

const CollectionsLayout = async ({ children }: { children: React.ReactNode }) => {
	const { collections } = await getCollections();

	return (
		<section>
			<Heading>Collections</Heading>
			<nav>
				<ul className="mt-2 flex flex-wrap justify-center gap-2">
					{collections.map(({ name }) => (
						<li key={name}>
							<ActiveLink asSubLink href={`/collections/${formatToSlug(name)}`}>
								{name}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>
			{children}
		</section>
	);
};

export default CollectionsLayout;
