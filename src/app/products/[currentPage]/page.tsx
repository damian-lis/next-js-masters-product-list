import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProducts } from "@/api/getProducts";

export const generateStaticParams = () => {
	const pageCount = 10;
	const pageNumbers = [];

	for (let i = 0; i < pageCount; i++) {
		pageNumbers.push({ pageNumber: String(i + 1) });
	}

	return pageNumbers;
};

const ProductsPage = async ({ params }: { params: { currentPage: string } }) => {
	const currentPageAsNumber = Number(params.currentPage);
	const productsPerPage = 3;

	const { products, productsTotal } = await getProducts({
		currentPage: currentPageAsNumber,
		count: productsPerPage,
	});

	return (
		<section>
			<ProductList products={products} />
			<Pagination
				baseUrl="/products"
				currentPage={currentPageAsNumber}
				resourcesTotal={productsTotal}
				resourcesPerPage={productsPerPage}
			/>
		</section>
	);
};

export default ProductsPage;
