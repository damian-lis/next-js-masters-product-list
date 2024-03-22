import { getCategories } from "@/graphql-services/getCategories";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { Heading } from "@/ui/atoms/Heading";
import { formatToSlug } from "@/utils/formatToSlug";

const CategoriesLayout = async ({ children }: { children: React.ReactNode }) => {
	const { categories } = await getCategories();

	return (
		<section>
			<Heading>Categories</Heading>
			<nav>
				<ul className="mt-2 flex flex-wrap justify-center gap-2">
					{categories.map(({ name }) => (
						<li key={name}>
							<ActiveLink
								asSubLink
								activeWhen={`/categories/${formatToSlug(name)}`}
								href={`/categories/${formatToSlug(name)}/1`}
							>
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

export default CategoriesLayout;
