import classes from './CartItem.module.css';
import {useDispatch} from 'react-redux';
import { cartItemsActions } from '../../store/cart';

const CartItem = (props) => {
  const price = `Rs. ${props.price.toFixed(2)}`;
  const dispatch = useDispatch(); 
  
  const removeItemHandler = () => {
    dispatch(cartItemsActions.removeItemsFromCart({
      item : {name : props.name, price : props.price, id: props.id, description: props.description, quantity : 1}
    }));
  }

  const addItemHandler = () => {
    dispatch(cartItemsActions.addItemsToCart({
      item : {name : props.name, price : props.price, id: props.id, description: props.description, quantity: 1}
    }));
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <div className={classes.price}>{price}</div>
          <div className={classes.amount}>x {props.amount}</div>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
