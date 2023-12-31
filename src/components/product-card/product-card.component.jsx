import './product-card.style.scss';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';


const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const {name, price, imageUrl} = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={addProductToCart } buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to card</Button>
        </div>
    )
}

export default ProductCard; 