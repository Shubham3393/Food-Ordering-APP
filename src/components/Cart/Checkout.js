import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { cartItemsActions } from '../../store/cart';
import { uiActions } from '../../store/ui';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const postalCodeRef = useRef();
    const dispatch = useDispatch();

    const confirmHandler = async (event) => {
        event.preventDefault();
        
        const storeAddress = async () => {

            dispatch(uiActions.loadingOrderHandler());
            const response = await fetch('https://food-app-74f07-default-rtdb.firebaseio.com/address.json', {
                method : 'PUT',
                body : JSON.stringify({
                    name : nameRef.current.value,
                    street : streetRef.current.value,
                    postalCode : postalCodeRef.current.value,
                    city : cityRef.current.value
                })
            });
            
            if(!response.ok){
                throw new Error('addresss is not fetched');
            }
        }

        try {
            await storeAddress();
        } catch (error) {
            console.log(error.message);
        }
        dispatch(cartItemsActions.replaceCart({items: [], totalAmount: 0, totalQuantity: 0, changed:true}));
        props.onConfirm();
    };

    return (
        <>
            <h3>Place Your Order</h3>
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Receiver Name</label>
                    <input type='text' ref={nameRef} id='name' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' ref={streetRef} id='street' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input type='text' ref={postalCodeRef} id='postal' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='city'>City</label>
                    <input type='text' ref={cityRef} id='city' />
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={props.onCancel}>
                    Cancel
                    </button>
                    <button className={classes.submit}>Confirm</button>
                </div>
            </form>
        </>
        
    );
};

export default Checkout;