import { CATEGORIES_TYPES } from "./Category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories : [],
}


export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CATEGORIES_TYPES.SET_CATAGORIES:
            return{
                ...state,
                categories : payload,
            }
        default :
            return state;
    }
}