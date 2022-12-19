import { cartItemsActions} from "./cart";


export const getItems = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch('https://food-ordering-app-bf020-default-rtdb.firebaseio.com/cart.json');
            if(!response.ok) {
                throw new Error('could not be able to get cart items');
            }

            const data = await response.json();

            return data; 
        }

        try {
            let data = await getData();
            if(data === null){
                data={
                    items :  [],
                    totalAmount : 0,
                    totalQuantity : 0
                }
            }
            dispatch(cartItemsActions.replaceCart({
                items : data.items || [],
                totalAmount : data.totalAmount,
                totalQuantity : data.totalQuantity,
                changed : false
            }))
        } catch (error) {
            // dispatch(
            //     uiActions.showNotification({
            //       status: 'error',
            //       title: 'Error!',
            //       message: 'Fetching cart data failed!',
            //     })
            //   );
        }
    }
}

export const putItems = (cart) => {
    return  async (dispatch) => {

        // dispatch(
        //     uiActions.showNotification({
        //       status: 'pending',
        //       title: 'Sending...',
        //       message: 'Sending cart data!',
        //     })
        // );

        const putData = async () => {
            const response = await fetch('https://food-ordering-app-bf020-default-rtdb.firebaseio.com/cart.json', {
                method : 'PUT',
                body : JSON.stringify({
                    items : cart.Items,
                    totalAmount : cart.totalAmount,
                    totalQuantity : cart.totalQuantity,
                })
            })

            if(!response.ok){
                throw new Error('could not able to upload items on cart');
            }

            // console.log("putItems: response", response)
        }

        try {
            await putData();

            // dispatch(
            //     uiActions.showNotification({
            //         status: 'success',
            //         title: 'Success!',
            //         message: 'Sent cart data successfully!',
            //     })
            // );

        } catch (error) {
            
            // dispatch(
            //     uiActions.showNotification({
            //       status: 'error',
            //       title: 'Error!',
            //       message: 'Sending cart data failed!',
            //     })
            // );
        }
    }
}