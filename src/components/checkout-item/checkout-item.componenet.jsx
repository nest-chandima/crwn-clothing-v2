// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { CartContext } from '../../contexts/cart.context';
import { CheckoutItemContainer,ImageContainer, Image, Name,Price,Quntity,RemoveButton } from './checkout-item.style';
import { clearItemFromCart, addItemToCart, removeItemsFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select';


const CheckoutItem = ({cartItem}) => {
    // const {clearItemFromCart, addItemToCart, removeItemsFromCart} = useContext(CartContext);
    const dispatch = useDispatch();


    const { name, imageUrl, quantity, price } = cartItem;

    const cartItems = useSelector(selectCartItems)
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems,cartItem));
    const reduceItemHandler = () => dispatch(removeItemsFromCart(cartItems,cartItem));

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={`{name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quntity>
            <div className='arrow' onClick={reduceItemHandler}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </Quntity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>

    )
}

export default CheckoutItem;