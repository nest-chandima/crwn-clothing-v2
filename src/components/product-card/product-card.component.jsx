import { Image, ProductCardContainer, ButtonContainer, Footer, Name, price, Price } from './product-card.style';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.select';



const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    // const {addItemToCart} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems)
    
    const addProductToCart = () => dispatch(addItemToCart(cartItems,product));

    return(
        <ProductCardContainer>
        <Image src= {`${imageUrl}`} alt={name} />
        <Footer>
            <Name>{name}</Name>
            <Price>{price}</Price>
        </Footer>
        <ButtonContainer buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to Cart</ButtonContainer>
    </ProductCardContainer>);
}

export default ProductCard;