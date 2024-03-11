import { getCategories } from "@/graphql-services/getCategories";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { formatToSlug } from "@/utils/formatToSlug";

const CategoriesLayout = async ({ children }: { children: React.ReactNode }) => {
	const { categories } = await getCategories();

	return (
		<section>
			<nav>
				<ul className="mt-2 flex justify-center space-x-4">
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
