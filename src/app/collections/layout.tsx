import { getCollections } from "@/graphql-services/getCollections";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { formatToSlug } from "@/utils/formatToSlug";

const CollectionsLayout = async ({ children }: { children: React.ReactNode }) => {
	const { collections } = await getCollections();

	return (
		<section>
			<nav>
				<ul className="mt-2 flex justify-center space-x-4">
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
