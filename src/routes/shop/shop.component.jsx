import CategoriesPreview from '../categories-preview/categories-preview.component.jsx';
import { Route, Routes } from 'react-router-dom';
import Category from '../../components/category/category.component.jsx';
import './shop.style.scss';
import { setCategories } from '../../store/Categories/Category.action.js';
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils.jsx";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const Shop = () => {

    const dispatch =useDispatch();

    useEffect(()=>{
        const getCategoriesMap =async () => {
            const categoriesArray = await getCategoriesAndDocuments(); 
            dispatch(setCategories(categoriesArray));
        }

        getCategoriesMap();
    }, []);
  
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}

export default Shop;