import { useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { cartItemsActions } from '../../../store/cart';

const MealItemForm = (props) => {
  const dispatch = useDispatch();

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(cartItemsActions.addItemsToCart({
      item : {name : props.item.name, price : props.item.price, id: props.item.id, description: props.item.description, quantity : parseInt(amountInputRef.current.value)}
    }));

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 ||enteredAmountNumber < 1 ||enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
