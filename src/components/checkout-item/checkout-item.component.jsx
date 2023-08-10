import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.style.scss';


const CheckoutItem = ({cartItem}) => {

    const {addItemToCart, removeItemToCart, clearItemFromCart} = useContext(CartContext);
    const {id, name, price, quantity, imageUrl} = cartItem;

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);

    return(
        <div className='checkout-item-container' key={id}>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>

            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler} >
                    &#10095;
                </div>
            </span>

            <span className='price'>{price}</span>
            <div onClick={clearItemHandler} className='remove-button'>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;