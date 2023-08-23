import { CATEGORIES_TYPES } from "./Category.types";

export const CATEGORIES_INITIAL_STATE = {
    categoriesMap : {},
}


export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CATEGORIES_TYPES.SET_CATAGORIES_MAP:
            return{
                ...state,
                categoriesMap : payload,
            }
        default :
            return state;
    }
}