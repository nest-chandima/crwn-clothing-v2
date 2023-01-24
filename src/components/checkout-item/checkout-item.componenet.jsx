import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutItemContainer,ImageContainer, Image, Name,Price,Quntity,RemoveButton } from './checkout-item.style';


const CheckoutItem = ({cartItem}) => {
    const {clearItemFromCart, addItemToCart, removeItemsFromCart} = useContext(CartContext);

    const { name, imageUrl, quantity, price } = cartItem;

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const reduceItemHandler = () => removeItemsFromCart(cartItem);

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