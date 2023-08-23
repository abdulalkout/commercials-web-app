import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";


export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : () => null,
});

// use reducer 
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : "SET_CURRENT_USER"
}

const INITIAL_STATE = {
    currentUser : null
}

const userReducer =(state, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default :
        throw new Error(`unhandeled type ${type} in userReducer` );
    }
}


export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);

    // use reducer
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE )
    
    const setCurrentUser = (user) => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
        );
    };

    const value = { currentUser, setCurrentUser };

    useEffect( ()=>{
        const unsubcribe = onAuthStateChangeListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        });
        return unsubcribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
