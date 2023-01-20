import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.style.scss';


const CheckoutItem = ({cartItem}) => {
    const {clearItemFromCart, addItemToCart, removeItemsFromCart} = useContext(CartContext);

    const { name, imageUrl, quantity, price } = cartItem;

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const reduceItemHandler = () => removeItemsFromCart(cartItem);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`{name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
            <div className='arrow' onClick={reduceItemHandler}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;