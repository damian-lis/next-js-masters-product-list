import { getProductList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

const HomePage = async () => {
	const products = await getProductList();

	return (
		<div>
			<ProductList products={products} />
		</div>
	);
};

export default HomePage;
