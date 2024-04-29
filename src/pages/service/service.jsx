import React, { useState } from "react";
import "./Service.css";
import logoImg from "../../assets/svg/Logo.svg";
import dividerImg from "../../assets/images/divider.png";
import SignupForm from "../../components/signupForm/SignupForm";
import SignupForm2 from "../../components/signupForm2/SignupForm2";
import Button from "../../components/button/Button";
import formImg from "../../assets/images/formicon.png";
// import privacyPage from '../../pages/privacyPage/Privacy

const ServiceForm = () => {
  const [input, setInput] = useState({
    signupasServiceProvider: "",
    signupasServiceSeeker: "",
    agreeToPrivacyPolicy: "",
  });
  // const [action, setAction] = useState("serviceForm");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setInput({
      ...input,
      [name]: newValue,
    });
  };

  return (
    <div auth-container>
      <form className="service-Auth-form">
        <div className="serviceForm-container">
          <div className="serviceForm-header">
            <div className="logo">
              <img src={logoImg} alt="" />
            </div>

            <div className="signup-btn-div">
              <Button
                text="Sign Up as a Service Provider"
                type="primary"
                className="signup-btn"
              />

              <Button
                text="Sign up as a Service Seeker"
                type="secondary"
                className="signup-btn"
              />
            </div>

            {/* <span className="user"> */}
            <div className="alt">
              Already a User? <span>Log In</span>
            </div>
            {/* </span> */}

            <div className="alt">
              <div className="login-line"></div>
            </div>

            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  id="agreeToPrivacy"
                  className="checked"
                  // checked={formData.agreeToPrivacyPolicy}
                  // onChange={handleChange}
                  required
                />
              </label>
              <span className="TnC">
                By signing up, you acknowledge that you have read, understood,
                and consented to the Terms and conditions, and the Privacy
                Policy of I-connect.
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="signupform-formImg">
        <img src={formImg} alt="Illustration" />
      </div>

      {/* </div> */}

      <SignupForm />
      <SignupForm2 />
    </div>
  );
};

export default ServiceForm;
