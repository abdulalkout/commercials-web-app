import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './cart-dropdown.style.scss';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext);
    
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item)=> <CartItem key={item.id} cartItem={item}/>)}
            </div>
            <Button>GO TO CHICKOUT</Button>
        </div>
    )
}

export default CartDropdown;