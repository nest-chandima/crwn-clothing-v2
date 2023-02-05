import { CategoryPreviewContainer, Title,Preview } from './category-preview.style';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({title, product}) => {

    return(
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    product.filter((_, idx) => idx < 4)
                    .map((product) =>
                    (
                        <ProductCard key={product.id} product={product}/>
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );

}

export default CategoryPreview;