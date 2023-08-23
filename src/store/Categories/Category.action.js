import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_TYPES } from "./Category.types";


export const setCategories = (categoriesArray) =>
    createAction(CATEGORIES_TYPES.SET_CATAGORIES, categoriesArray);