import { CartItemContainer, Image,ItemDetails,Name } from "./cart-item.style";

const CartItem = ({CartItem}) => {

    const {name, quantity, imageUrl, price} = CartItem; 
    
    return (
        <CartItemContainer>
            <Image src={imageUrl} alt={name}/>
            <ItemDetails>
                <Name>{name}</Name>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;