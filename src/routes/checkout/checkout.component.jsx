import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.style';
import CheckoutItem from '../../components/checkout-item/checkout-item.component.jsx';


const CheckOut= () => {

    const {cartItems, cartTotal} = useContext(CartContext);

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock as='span'>
                    product
                </HeaderBlock>
                <HeaderBlock as='span'>
                    Description
                </HeaderBlock>
                <HeaderBlock as='span'>
                    Quantity
                </HeaderBlock>
                <HeaderBlock as='span'>
                    Price
                </HeaderBlock>
                <HeaderBlock as='span'>
                    Remove
                </HeaderBlock> 
            </CheckoutHeader>
            {cartItems.map((cartItem)=>{
                return (<CheckoutItem key={cartItem.id} 
                    cartItem={cartItem}  
                    />)
            })}
            <Total>Total : ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default CheckOut;