
// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ShoppingIcon, ItemCount } from "./card-icon.style";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.select";
import { setIsCartOpen } from "../../store/cart/cart.action";


const CartIcon = () => {
   // const { isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext);
   const isCartOpen = useSelector(selectIsCartOpen);
   const cartCount = useSelector(selectCartCount)

   const dispatch = useDispatch();
   

   const toggleIsCartOpen = () =>  dispatch(setIsCartOpen(!isCartOpen));
 return(
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
 )
}

export default CartIcon;