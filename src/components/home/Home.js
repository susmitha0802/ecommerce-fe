import { ProductList } from "../product-list/ProductList";
import "./Home.css";
import "../../styles/Button.css";

export const Home = () => {
    return (
        <>
            <div className="products">
                <h1>Products</h1>
                <button className="create-product">Create Product</button>
            </div>
            <ProductList/>
        </>
    )
}
