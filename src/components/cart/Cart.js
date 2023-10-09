import { useState } from "react";
import "../../styles/Button.css";
import "./Cart.css";
import { useRecoilValue } from "recoil";
import { AddToCart } from "../AddToCart";
import { ProductImg } from "../product-img/ProductImg";

export const Cart = () => {

  const [displayCart, setDisplayCart] = useState(false); 
  const cartItems = useRecoilValue(AddToCart);

  const noOfCartItems = cartItems.length;

  return (
    <>
      <button className="cart" onClick={() => setDisplayCart(!displayCart)}>Cart {noOfCartItems>0 &&(`(${noOfCartItems})`)}</button>
      {
        displayCart && (noOfCartItems===0 ? 
          <div className="cart-items">Your cart is empty</div> : 
          <div className="cart-items">{
            cartItems.map(cartItem => {
              return (
                <div key={cartItem.id} className="cart-item">
                  <ProductImg url={cartItem.url}/>
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.description}</p>
                    <p>Quantity: {cartItem.cartQuantity}</p>
                    <p>Price: <strong>$ {cartItem.price * cartItem.cartQuantity}</strong></p>
                  </div>
                </div>
              );
            })
          }
          </div>)
      }
    </>
  )
}
