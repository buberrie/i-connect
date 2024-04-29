import React, { useMemo, useState } from "react";
import "./Login.css";
import logoImg from "../../assets/svg/Logo.svg";
import Button from "../../components/button/Button";
import formImg from "../../assets/images/formicon.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

    // General login logic
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://i-connect-wj57.onrender.com/api/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Store the token in local storage or state management
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data._id);

          // Get the token from local storage
          const userId = localStorage.getItem("userId");
      
          const token = localStorage.getItem("token");
      
          // If token is not found, return null or handle as appropriate
          if (!token) {
            return null;
          }
      
          try {
            // Make a request to the server to get the user information
            const response = await axios.get(
              `https://i-connect-wj57.onrender.com/api/user/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
              }
            );
            // If request is successful, return the user data
            setUser(response.data);
          } catch (error) {
            
            console.error("Error fetching user:", error.message);
            return null;
          }

        // Redirect to previous page
        navigate(-1);

        console.log(response.data);
        
      } 
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          // Handle unauthorized (401) error
          console.error("Login failed:", error.response.data.message);
          alert("Login failed. Email or password is not correct.");
        } else {
          // Handle other error responses
          console.error("Error logging in:", error.response.data);
          alert("Login failed. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
    
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (input) =>
    input.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (input.email === "") return false;

    return validateEmail(input.email) ? false : true;
  }, [input.email]);

  const validatePassword = (input) => input.length >= 8;

  const isPasswordValid = useMemo(() => {
    if (input.password === "") return false;

    return !validatePassword(input.password);
  }, [input.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Implement your login logic here

      // Clear input fields after submission
      setInput({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="Auth1-wrapper">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Loginpage-container">
          <div className="Loginpage-header">
            <div className="logo">
              <img src={logoImg} alt="" />
            </div>
            <span className="form-text">
              <h4>WELCOME BACK TO I-CONNECT!</h4>
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="login-label">
              Email
              <input
                className="login-input"
                type="text"
                value={input.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                id="email"
                name="email"
                required
              />
{/*               {isEmailInvalid && (
                <div className="error">Please enter a valid email address</div>
              )} */}
            </label>

            <label htmlFor="password" className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                value={input.password}
                onChange={handleInputChange}
                id="password"
                name="password"
                placeholder="Password"
                required
              />
{/*               {isPasswordValid && (
                <div className="error">
                  Password should be at least 8 characters, 1 uppercase and
                  atleast 1 number
                </div>
              )} */}
            </label>

            <div className="forgot-password">
              Lost Password? <span>Click Here</span>
            </div>

            <div className="login-btn-div">
              <Button text="Login" className="login-btn" type="submit" />
            </div>
          </div>

          <div className="alt">
            <div className="login-line"></div>
            <span>OR</span>
            <div className="login-line"></div>
          </div>

          <div className="login-btn-div">
            <Button
              text="Continue with Google"
              type="secondary"
              className="login-btn"
            />
            <Button
              text="Continue with Apple"
              type="secondary"
              className="login-btn"
            />
          </div>
        </div>
      </form>
      <div className="Loginpage-formImg">
        {" "}
        <img src={formImg} alt="Illustration" />
      </div>
    </div>
  );
};

export default LoginPage;
