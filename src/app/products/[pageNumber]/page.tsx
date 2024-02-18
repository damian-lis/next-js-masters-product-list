import { redirect } from "next/navigation";

import { getProductList } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const generateStaticParams = () => {
	const pageCount = 10;
	const pageNumbers = [];

	for (let i = 0; i < pageCount; i++) {
		pageNumbers.push({ pageNumber: String(i + 1) });
	}

	return pageNumbers;
};

const ProductsPageNumber = async ({ params }: { params: { pageNumber: string } }) => {
	const pageNumberAsNumber = Number(params.pageNumber);

	if (Number.isNaN(pageNumberAsNumber) || pageNumberAsNumber < 1) return redirect("/products/1");

	const products = await getProductList({ pageNumber: pageNumberAsNumber });

	if (!products.length)
		return (
			<div>
				<h2>No products!</h2>
				<ActiveLink href="/">Go back to home!</ActiveLink>
			</div>
		);

	return (
		<>
			<ProductList products={products} />
			<section className="mt-5 text-center">
				<Pagination
					links={[
						{
							name: "Prev",
							href: `/products/${pageNumberAsNumber - 1}`,
							isDisabled: pageNumberAsNumber === 1,
						},
						pageNumberAsNumber !== 1
							? {
									name: pageNumberAsNumber - 1,
									href: `/products/${pageNumberAsNumber - 1}`,
									isDisabled: false,
								}
							: undefined,
						{
							name: pageNumberAsNumber,
							href: `/products/${pageNumberAsNumber}`,
							isDisabled: false,
						},
						{
							name: pageNumberAsNumber + 1,
							href: `/products/${pageNumberAsNumber + 1}`,
							isDisabled: false,
						},
						pageNumberAsNumber === 1
							? {
									name: pageNumberAsNumber + 2,
									href: `/products/${pageNumberAsNumber + 2}`,
									isDisabled: false,
								}
							: undefined,
						{
							name: "Next",
							href: `/products/${pageNumberAsNumber + 1}`,
							isDisabled: false,
						},
					]}
				/>
			</section>
		</>
	);
};

export default ProductsPageNumber;
