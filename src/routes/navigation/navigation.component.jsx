import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { NavigationComponent,LogoContainer,NavLink,NavLinks } from "./navigation.style";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {

    // const {currentUser} =useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);  
    const {isCartOpen} = useContext(CartContext);

    return(
      <Fragment>
        <NavigationComponent>
            <LogoContainer to='/'>
                <CrwnLogo />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ):(
                    <NavLink to='/auth'>
                        SIGN IN
                    </NavLink>
                )}
                <CartIcon />
            </NavLinks>
            {/* if bouth true then render the dropdown */}
            {isCartOpen && <CartDropdown />}
        </NavigationComponent>
        <Outlet />
      </Fragment>
    )
}


export default Navigation;