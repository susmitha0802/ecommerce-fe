import { NavLink } from "react-router-dom";
import { Cart } from "../cart/Cart";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/product/:id">Product</NavLink>
        <Cart/>
    </nav>
  )
}
