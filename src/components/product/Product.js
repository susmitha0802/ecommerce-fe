import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { ProductDetails } from "../product-details/ProductDetails";
import { ProductImg } from "../product-img/ProductImg";
import { Variant } from "./Variant";
import { AddToCart } from "../AddToCart";
import { AddReview } from "../add-review/AddReview";
import { Reviews } from "../reviews/Reviews";
import "./Product.css";
import "../../styles/ProductDetails.css";
import "../../styles/Button.css";


export const Product = () => {
  const params = useParams();
  const id = params.id;
  const {data, isLoading, isError} = useQuery(["product-details", id], () => {
    return axios.get(`http://localhost:4000/products/${id}`);
  })

  const [url, setUrl] = useState();

  const [items, setItems] = useRecoilState(AddToCart);


  if(isLoading) {
    return <h3>Loading...</h3>
  }

  if(isError) {
    return <h3>Error</h3>
  }

  const itemIndex = items.findIndex(items => items.id === data?.data.id);

  const currentItem = itemIndex >= 0 ? items[itemIndex] : undefined;


  const handleClick = () => {
    if(itemIndex < 0) {
      setItems((oldItems) => [
        ...oldItems, {
          id: data?.data.id,
          name: data?.data.name,
          description: data?.data.description,
          price: data?.data.price,
          quantity: data?.data.quantity,
          url: data?.data.variants[0].url,
          cartQuantity: 1,
        }
      ]);
    }
  }

  const decrease = () => {
    if(currentItem.cartQuantity === 1) {
      setItems([...items.slice(0, itemIndex), ...items.slice(itemIndex+1)])
    }
    else {
      setItems([...items.slice(0, itemIndex), {...currentItem, cartQuantity:currentItem.cartQuantity-1}, ...items.slice(itemIndex+1)])
    }
  }

  const increase = () => {
    setItems([...items.slice(0, itemIndex), {...currentItem, cartQuantity:currentItem.cartQuantity+1}, ...items.slice(itemIndex+1)])
  }

  return (
    <div>
      <div className="prod" key={id}> 
        <ProductImg url={url ? url : data?.data.variants[0].url}/>
        <div className="prod-details">
          <ProductDetails 
            name={data?.data.name} 
            description={data?.data.description} 
            price={data?.data.price}/>
          <div className="product-details">
            <p>{data?.data.quantity > 10 ? "Available" : data?.data.quantity === 0 ? "Unavailable" : "Selling fast"}</p>
            <div className="flex-variant">
              {
                data?.data.variants.map(variant => {
                  return <Variant 
                    key={variant.id} 
                    color={variant.color} 
                    onClick = {() => setUrl(variant.url) }/>
                })
              }
            </div>
            {
              currentItem ? 
                <div>
                  <button onClick={decrease}>-</button>
                  {" "+ items[itemIndex].cartQuantity+ " "}
                  {items[itemIndex].cartQuantity < data?.data.quantity && <button onClick={increase}>+</button>}
                </div> 
                : <button onClick={handleClick}>Add to Cart</button>
            }
            <AddReview id={id}/>
          </div>
        </div>
      </div>
      <h1>Reviews of our customers</h1>
      <Reviews id={id}/>
    </div>
  )
}
