import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProducts } from "@/graphql-services/getProducts";
import { type ProductSortBy } from "@/graphql/generated/graphql";

import { ActiveLink } from "@/ui/atoms/ActiveLink";

const productsPerPage = 3;

export const generateStaticParams = async () => {
	const { productsTotal } = await getProducts();
	const totalPages = Math.ceil(productsTotal / productsPerPage);
	const sortingOptions: ProductSortBy[] = ["PRICE", "RATING"];

	const pageNumbersWithSorting: { currentPage: string; sortBy: ProductSortBy }[] = [];

	for (let i = 0; i < totalPages; i++) {
		sortingOptions.forEach((sortingOption) => {
			pageNumbersWithSorting.push({
				currentPage: String(i + 1),
				sortBy: sortingOption,
			});
		});
	}

	return pageNumbersWithSorting.filter((v) => ({ ...v, sortBy: v.sortBy.toUpperCase() }));
};

const ProductsPage = async ({
	params,
	searchParams,
}: {
	params: { currentPage: string };
	searchParams: { sortBy: string };
}) => {
	const currentPageAsNumber = Number(params.currentPage);
	const productsPerPage = 3;

	const { products, productsTotal } = await getProducts({
		currentPage: currentPageAsNumber,
		count: productsPerPage,
		orderBy: searchParams.sortBy.toUpperCase() as ProductSortBy,
	});

	return (
		<section>
			<ul className="mb-8 mt-2 flex justify-center space-x-4 ">
				<li>
					<ActiveLink
						data-testid="sort-by-price"
						href={`/products/${params.currentPage}?sortBy=price`}
					>
						Price
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						data-testid="sort-by-rating"
						href={`/products/${params.currentPage}?sortBy=rating`}
					>
						Rating
					</ActiveLink>
				</li>
			</ul>
			<ProductList products={products} />
			<Pagination
				searchParams={searchParams}
				baseUrl={`/products`}
				currentPage={currentPageAsNumber}
				resourcesTotal={productsTotal}
				resourcesPerPage={productsPerPage}
			/>
		</section>
	);
};

export default ProductsPage;
