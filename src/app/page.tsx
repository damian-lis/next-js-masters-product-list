import products from "../../productsData.json";
import { ProductList } from "@/ui/organisms/ProductList";

const MainPage = () => {
	return <ProductList products={products} />;
};

export default MainPage;
