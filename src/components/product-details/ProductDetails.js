import "../../styles/ProductDetails.css";

export const ProductDetails = ( {name, description, price}) => {
  return (
    <div className="product-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price: <strong>$ {price}</strong></p>
    </div>
  )
}
