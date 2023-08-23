import './category.style.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
// import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../product-card/product-card.component';
import { selectCategoriesMap } from '../../store/Categories/Category.selector';

const Category = () => {
    const {category} = useParams();
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);  
    const [products, setProducts] = useState(categoriesMap[category]);
 

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])

    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => <ProductCard product={product} key={product.id}/>)
                }
            </div>
        </Fragment>
    )
}

export default Category;