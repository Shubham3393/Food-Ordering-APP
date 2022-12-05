import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Layout/Header';
import Meals from '../components/Meals/Meals';
import Cart from '../components/Cart/Cart';
import { useEffect } from 'react';
import { getItems, putItems } from '../store/cart-action';
const Home = () => {

    const cart = useSelector(state => state.cart);
    const showCart = useSelector(state => state.ui.showCart);
    const dispatch = useDispatch();
  
    useEffect(()=>{
  
      dispatch(getItems());
  
    },[dispatch])
  
    useEffect(() => {
  
      if(cart.changed){
        dispatch(putItems(cart));
      }
    
    },[dispatch, cart]);

    return (
        <>
             {showCart&& <Cart />}
            <Header  />
            <main>
            <Meals />
            </main>
        </>
    )
}

export default Home;