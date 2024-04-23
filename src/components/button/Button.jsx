/* eslint-disable react/prop-types */
import './style.css'

const Button = ({ type, text, onClick, processing }) => {
    let buttonStyle;
  
    // Determine button style based on the type prop
    switch (type) {
      case 'secondary':
        buttonStyle = {
          backgroundColor: 'var(--white)',
          color: 'var(--wine-red)',
          border: '1px solid var(--wine-red)',
          fontWeight: '600'
        };
        break;
      case 'tertiary':
        buttonStyle = {
          backgroundColor: 'var(--brown)',
          color: 'white',
        };
        break;
      case 'danger':
        buttonStyle = {
          backgroundColor: 'var(--white)',
          color: 'var(--danger)',
          border: '1px solid var(--danger)',
          fontWeight: '600'
        };
        break;
      default:
        buttonStyle = {
            backgroundColor: 'var(--wine-red)',
            color: 'white',
            border: '1px solid transparent',
        };
    }
  
    return (
      <button className={processing && processing !== null ? "disabled" : ''} style={{ ...buttonStyle }} onClick={onClick} >
        {text}
      </button>
    );
  };
  
  export default Button;