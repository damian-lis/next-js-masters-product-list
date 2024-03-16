import { getProducts } from "@/graphql-services/getProducts";
import { ProductList } from "@/ui/organisms/ProductList";

const HomePage = async () => {
	const { products } = await getProducts({});

	return (
		<div>
			<ProductList products={products} />
		</div>
	);
};

export default HomePage;
