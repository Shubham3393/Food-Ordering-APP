import {  useEffect, useState } from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import classes from './HeaderCartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { uiActions } from '../../store/ui';

const HeaderCartButton = (props) => {

  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const items = useSelector(state => state.cart.Items);
  

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  const dispatch = useDispatch();

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={() => {dispatch(uiActions.visibleCart())}}>
      <div className={classes.icon}>
        <AiOutlineShoppingCart />
      </div>
      <div>Your Cart</div>
      <div className={classes.badge}>{totalQuantity}</div>
    </button>
  );
};

export default HeaderCartButton;
