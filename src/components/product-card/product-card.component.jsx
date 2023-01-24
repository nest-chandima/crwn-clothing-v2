import { Image, ProductCardContainer, ButtonContainer, Footer, Name, price, Price } from './product-card.style';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';


const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const {addItemToCart} = useContext(CartContext);
    
    const addProductToCart = () => addItemToCart(product);

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