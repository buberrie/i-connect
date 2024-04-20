import { useState } from "react";
import axios from "axios";

function VendorSignUp() {
  const [formData, setFormData] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    phone: "",
    username: "",
    location: "",
    role: "",
    password: "",
    imageUrl: "null",
    bio: "null",
  });

  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log(JSON.stringify(formData));
  };

  const handleLoginChange = (e) => {
    setFormLoginData({ ...formLoginData, [e.target.name]: e.target.value });
  };

  // sign up vendor logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://i-connect-wj57.onrender.com/api/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Vendor signed up successfully!");

        const response = await axios.post(
          "https://i-connect-wj57.onrender.com/api/user/login",
          {
            email: formData.email,
            password: formData.password
          },
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

          // Redirect to home
          window.location.href = "/";

          console.log(response.data);
        } else {
          // Handle error response from server
          console.error("Login failed:", response.data.message);
          // Display error message to user
          alert("Login manually.");

          // Redirect to login page
          // window.location.href = '/';
        }
      } else {
        alert("Sign-up failed");
        console.error("Sign-up failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // General login logic
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://i-connect-wj57.onrender.com/api/user/login",
        formLoginData,
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

        // Redirect to home
        window.location.href = "/";

        console.log(response.data);
      } else {
        // Handle error response from server
        console.error("Login failed:", response.data.message);
        // Display error message to user
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Display error message to user
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div>
        <h2>Vendor Sign-up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_Name"
            value={formData.first_Name}
            onChange={handleChange}
            placeholder="first Name"
            required
          />
          <input
            type="text"
            name="last_Name"
            value={formData.last_Name}
            onChange={handleChange}
            placeholder=" last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="location"
            required
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="role"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="email"
            value={formLoginData.email}
            onChange={handleLoginChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formLoginData.password}
            onChange={handleLoginChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default VendorSignUp;
