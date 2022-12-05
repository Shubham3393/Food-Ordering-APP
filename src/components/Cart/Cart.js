import { useDispatch, useSelector} from 'react-redux';
import Modal from '../../Pages/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import { uiActions } from '../../store/ui';
import Checkout from './Checkout';

const Cart = (props) => {


  const Items = useSelector(state => state.cart.Items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();
  const ui = useSelector(state => state.ui);

  const amount = `Rs. ${totalAmount.toFixed(2)}`;
  const hasItems = Items.length > 0;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {Items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.quantity}
          price={item.price}
          id ={item.id}
          description= {item.description}
        />
      ))}
    </ul>
  );

  const onConfirmHandler = () => {
    dispatch(uiActions.loadingOrderHandler());
    dispatch(uiActions.placeOrderHandler());
    dispatch(uiActions.orderPlacedHandler());
  }
  return (
    <Modal>
      {!ui.placeOrder&&!ui.loadingOrder&&!ui.orderPlaced &&    
        <>  
          {cartItems}
          <div className={classes.total}>
            <div>Total Amount</div>
            <div>{amount}</div>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={() => {dispatch(uiActions.inVisibleCart())}}>
              Close
            </button>
            {hasItems && <button onClick={()=>{dispatch(uiActions.placeOrderHandler())}} className={classes.button}>Order</button>}
          </div>
        </>
      }
      {ui.loadingOrder && <h3>placing your order, please wait...</h3>}
      {ui.orderPlaced && <h3>Your order is placed, thankyou for ordering </h3>}
      {ui.placeOrder&&!ui.loadingOrder&&!ui.orderPlaced && <Checkout onConfirm={onConfirmHandler} onCancel={()=>{dispatch(uiActions.placeOrderHandler())}}/>}
    </Modal>
  );
};

export default Cart;

