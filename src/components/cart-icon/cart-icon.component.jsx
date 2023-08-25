import { CartIconContainer,ItemCount,ShoppingIcon } from "./cart-icon.style";
import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen,selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { CART_ACTION_TYPES } from "../../store/cart/cart.types";

const CartIcon = () => {

    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;  