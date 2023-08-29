
export const loggerMiddleWare = (store) => (next) => (action) =>{

    if(!action.type){
        return next(action);
    }

    console.log('Type : ', action.type);
    console.log('Payloade : ', action.payload);
    console.log('Store State : ', store.getState());

    next(action);

    console.log('Store State : ', store.getState());
}