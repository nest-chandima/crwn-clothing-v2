import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.style';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.select';

const CartDropdown = () =>{

    const navigate = useNavigate(); 
    const cartItems = useSelector(selectCartItems);

    const goToCheckoutHandler = () =>{
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?(cartItems.map((item)=>
                        <CartItem key={item.id} CartItem={item} />
                        )
                    ): (
                        <EmptyMessage>Your Cart is Empty</EmptyMessage>
                    )
                }
                
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;