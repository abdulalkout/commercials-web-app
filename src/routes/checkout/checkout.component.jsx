import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout.style.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component.jsx';


const CheckOut= () => {

    const {cartItems, cartTotal} = useContext(CartContext);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='headre-block'>
                    <span>product</span>
                </div>
                <div className='headre-block'>
                    <span>Description</span>
                </div>
                <div className='headre-block'>
                    <span>Quantity</span>
                </div>
                <div className='headre-block'>
                    <span>Price</span>
                </div>
                <div className='headre-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem)=>{
                return (<CheckoutItem key={cartItem.id} 
                    cartItem={cartItem}  
                    />)
            })}
            <span className='total'>Total : ${cartTotal}</span>
        </div>
    )
}

export default CheckOut;