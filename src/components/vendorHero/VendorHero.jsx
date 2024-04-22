/* eslint-disable react/prop-types */
import "./style.css"
import Button from "../button/Button"
import vendorImg from "../../assets/images/Allura.png"

const VendorHero = ({user}) => {
  return (
    <div className="vendor-hero padding-y">
      <p className="vendor-hero-boost">How are you today {user?.first_Name} ?</p>
      <p>Let&apos;s find the perfect match for your skills and expertise.</p>
      <div className="vendor-hero-card">
        <div className="vendor-hero-text">
          <p>Boost your profile today </p>
          <h2>Boosting your profile increases your visibility <br/> by 50%</h2>
          <Button text="Boost Now" type="secondary"/>
        </div>
        <div className="vendor-hero-img">
          <img src={vendorImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default VendorHero