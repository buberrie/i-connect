/* eslint-disable react/prop-types */
import './style.css'
import logo from '../../assets/svg/Logo.svg'

const Loader = ({loading}) => {
  return (
<div className={`loader-container ${loading ? "open" : ""}`}>
    <img className="image" src={logo} alt="Animated Image"/>
  </div>
  )
}

export default Loader