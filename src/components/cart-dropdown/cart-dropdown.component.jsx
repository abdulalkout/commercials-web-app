import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import { CartDropdownContainer,CartItems,EmptyMessage,DropDownButton } from './cart-dropdown.style';
import CartItem from '../cart-item/cart-item.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';


const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
     navigate('/chekout')
    } 
    
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                cartItems.length ? (cartItems.map((item)=> <CartItem key={item.id} cartItem={item}/>)) :
                (<EmptyMessage>your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHICKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;