import { Link } from "react-router-dom";
import { useQuery} from "react-query";
import axios from "axios";
import { ProductItem } from "../product-item/ProductItem";
import "./ProductList.css";

export const ProductList = () => {

    const products = useQuery("products-list", () => {
        return axios.get("http://localhost:4000/products");
    })

    if(products.isLoading) {
        return <h3>Loading...</h3>
    }

    if(products.isError) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <div className="flex-style">
                {
                    products.data?.data.map(product => {
                        return <div key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <ProductItem 
                                url = {product.variants[0].url} 
                                name = {product.name }
                                description = {product.description}
                                price = {product.price}/> 
                            </Link>
                        </div>
                    })
                }
            </div>
        </>
    )
}
