import React from "react";
import { type Route } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { Heading } from "@/ui/atoms/Heading";
import { getCategories } from "@/api/getCategories";
import { getCategoryBySlug } from "@/api/getCategoryBySlug";
import { Pagination } from "@/ui/molecules/Pagination";

export const generateStaticParams = async () => {
	const { categories } = await getCategories();
	return categories.map((category) => ({ categoryName: category.name }));
};

const CategoryPage = async ({ params }: { params: { slug: string; page: string } }) => {
	const category = await getCategoryBySlug(params.slug);

	const currentPageAsNumber = Number(params.page);
	const productsPerPage = 3;

	const skipProductsCount = (currentPageAsNumber - 1) * productsPerPage;
	const takeProductsCount = productsPerPage * currentPageAsNumber;
	const selectedProducts = category?.products.slice(skipProductsCount, takeProductsCount);

	return (
		<section>
			<Heading>Category name: {category?.name}</Heading>
			<ProductList products={selectedProducts} />
			<Pagination
				baseUrl={`/categories/${params.slug}` as Route}
				currentPage={currentPageAsNumber}
				resourcesTotal={category?.products.length || 0}
				resourcesPerPage={productsPerPage}
			/>
		</section>
	);
};

export default CategoryPage;
