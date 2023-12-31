import Home from "./routes/home/home.component";
import { Route, Routes} from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";

import { onAuthStateChangeListener, createUserDocumentFromAuth,getCategoriesAndDocuments } from "./utils/firebase/firebase.utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";



const App = () => {

  const dispatch =useDispatch();

  useEffect( ()=>{
    const unsubcribe = onAuthStateChangeListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    return unsubcribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element= {<Navigation />}>
        <Route index element= {<Home />} />
        <Route path="auth" element= {<Authentication />} />
        <Route path="shop/*" element= {<Shop />} />
        <Route path="chekout" element = {<CheckOut/>} />
      </Route>
    </Routes>
  );
}

export default App;
