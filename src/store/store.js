import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";




// MiddleWare
// const middleWares =[logger];
const loggerMiddleWare = (store) => (next) => (action) =>{

    if(!action.type){
        return next(action);
    }

    console.log('Type : ', action.type);
    console.log('Payloade : ', action.payload);
    console.log('Store State : ', store.getState());

    next(action);

    console.log('Store State : ', store.getState());
}

const middleWares =[loggerMiddleWare];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer

export const store = createStore(rootReducer, undefined, composedEnhancers)
