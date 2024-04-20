import { useContext } from 'react';
import ModalContext from '../../context/ModalContext';
import successIcon from '../../assets/svg/success-icon.svg'
import errorIcon from '../../assets/svg/fail-icon.svg'

const Modal = () => {
  const { isOpen, type, title, message, onClose } = useContext(ModalContext);

  if (!isOpen) return null;

  const iconClass = type === 'success' ? successIcon : errorIcon;

  return (
    <div className={`modal ${type}`}>
      <div className="modal-content">
        <img src={iconClass} className={iconClass}></img>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
