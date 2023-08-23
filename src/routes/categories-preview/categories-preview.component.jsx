// import {CategoriesContext} from '../../context/categories.context.jsx';
import { useContext, Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component.jsx';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/Categories/Category.selector.js';



const CategoriesPreview = () => {

    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);  

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} products={products} title={title} />
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;