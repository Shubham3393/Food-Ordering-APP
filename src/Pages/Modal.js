import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui';

import classes from './Modal.module.css';

const Backdrop = () => {
  const orderPlaced = useSelector(state => state.ui.orderPlaced);
  const dispatch = useDispatch();
  const backgroundClickHandler = () => {
    if(orderPlaced) dispatch(uiActions.orderPlacedHandler());
    dispatch(uiActions.inVisibleCart());
  }
  return <div className={classes.backdrop} onClick={backgroundClickHandler}/>;
};

 const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </>
  );
};

export default Modal;
