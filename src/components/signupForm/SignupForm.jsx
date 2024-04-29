import React, { useState } from "react";
import "./Signup.css";
import logoImg from "../../assets/svg/Logo.svg";
import Button from "../../components/button/Button";
import formImg from "../../assets/images/formicon.png";

const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    if (!formValues.fullName.trim()) {
      errors.fullName = "Full name is required";
      formIsValid = false;
    }

    const validateEmail = (input) =>
      input.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
      formIsValid = false;
    }

    if (!formValues.password.trim()) {
      errors.password = "password is required";
      formIsValid = false;
    }

    if (!formValues.confirmPassword.trim()) {
      errors.confirmPassword = "confirmPassword is required";
      formIsValid = false;
    }

    if (!formValues.username.trim()) {
      errors.username = "username is required";
      formIsValid = false;
    }

    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = "phoneNumber is required";
      formIsValid = false;
    }

    if (formIsValid) {
      // Form is valid, clear input fields
      setFormValues({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        phoneNumber: "",
      });

      // Handle form submission logic here
      console.log("Form submitted:", formValues);
    } else {
      // Form is invalid, set errors state
      setErrors(errors);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="signupform-container">
          <div className="signupform-header">
            <div className="logo">
              <img src={logoImg} alt="" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fullName" className="signup-label">
              Full Name
              <input
                className="signup-input"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formValues.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && (
                <div className="error">{errors.fullName}</div>
              )}
            </label>

            <label htmlFor="email" className="signup-label">
              Email
              <input
                className="signup-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formValues.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </label>

            <label htmlFor="password" className="signup-label">
              Password
              <input
                className="signup-input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </label>

            <label htmlFor="confirmPassword" className="signup-label">
              Confirm Password
              <input
                className="signup-input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </label>

            <label htmlFor="username" className="signup-label">
              Username
              <input
                className="signup-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </label>

            <label htmlFor="phoneNumber" className="signup-label">
              Phone Number
              <input
                className="signup-input"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formValues.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && (
                <div className="error">{errors.phoneNumber}</div>
              )}
            </label>
          </div>

          <div className="checkbox-card">
            <label>
              <input
                type="checkbox"
                id="agreeToPrivacyPolicy"
                className="checked"
                value={formValues.agreeToPrivacyPolicy}
                onChange={handleChange}
                required
              />
            </label>

            <span className="TnC">
              By signing up, you acknowledge that you have read, understood, and
              consent to the Terms and conditions, and the Privacy Policy of
              I-connect.
            </span>
          </div>

          <div className="signup-btn-div">
            <Button text="Create an Account" className="signup-btn" />
          </div>

          <div className="alt">
            <div className="signup-line"></div>
            <span>OR</span>
            <div className="signup-line"></div>
          </div>

          <div className="signup-btn-div">
            <Button
              text="Continue with Google"
              type="secondary"
              className="signup-btn"
            />
            <Button
              text="Continue with Apple"
              type="secondary"
              className="signup-btn"
            />
          </div>
        </div>
      </form>
      <div className="Loginpage-formimg">
        <img src={formImg} alt="Illustration" />
      </div>
    </div>
  );
};

export default SignupForm;
