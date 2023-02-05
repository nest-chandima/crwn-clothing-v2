import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { CategoryContainer,Title } from './category.styles';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesisLoading, selectCategoriesMap } from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category]);
    const isLoading = useSelector(selectCategoriesisLoading);

    useEffect(() => {
        setProducts(categoriesMap[category.toLocaleLowerCase()])
    }, [category,categoriesMap]);

    return(
        <Fragment>
        <Title>{category.toUpperCase()}</Title>
        {
            (isLoading)?(<Spinner />):
            (
                <CategoryContainer>
                    {
                        products && products.map((product) => <ProductCard key={product.id} product={product}/>)
                        
                    }
                    
                </CategoryContainer>
            )
        }
        </Fragment>
    );
}

export default Category;