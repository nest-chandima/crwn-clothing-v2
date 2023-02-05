import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesisLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {


    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesisLoading);
    return(

     <Fragment>
        {
            (isLoading)?(<Spinner />):
            (Object.keys(categoriesMap).map((title) => {
                const product = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} product={product}/>
                    );
            }
            ))
        }
     </Fragment>

    );
}

export default CategoriesPreview;