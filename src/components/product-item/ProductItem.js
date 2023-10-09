import { ProductDetails } from "../product-details/ProductDetails";
import { ProductImg } from "../product-img/ProductImg";
import "./ProductItem.css";
import "../../styles/ProductDetails.css";

export const ProductItem = ({url, name, description, price}) => {
  return (
    <div className="item">
      <ProductImg url={url}/>
      <ProductDetails name={name} description={description} price={price}/>
    </div>
  )
}
