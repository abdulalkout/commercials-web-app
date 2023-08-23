import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_TYPES } from "./Category.types";


export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORIES_TYPES.SET_CATAGORIES_MAP, categoriesMap);