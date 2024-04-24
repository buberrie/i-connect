/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/homepage/Home";
import VendorSignUp from "./pages/loginsignup/LoginSignup";
import Categories from "./pages/categoriesPage/Categories";
import SingleCategory from "./pages/singleCategories/SingleCategory";
import Vendor from "./pages/vendorDetail/Vendor";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
import axios from "axios";
import AddServicesForm from "./pages/vendorSettings/VendorSettings";
import { getAllServices, getAllServicesByCategory } from "./APIs";
import Loader from "./components/loader/Loader";
import VendorDashboard from "./pages/vendorDashboard/VendorDashboard";
import PrivateRoutes from "./utilities/PrivateRoute";

function App() {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user from server and set it
    getCurrentUser();
  }, []);

  // useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
  
     handleLoad()  

  const getCurrentUser = async () => {
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
  };

  return (
    <div className={`body ${loading ? "loader" : ""}`}>
      <Router>
        <Loader loading={loading} />
        <Routes>
          <Route path="*" element={<LayoutWithNavbarAndFooter />}></Route>
          <Route path="loginsignup" element={<VendorSignUp />} />
          <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<VendorDashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function LayoutWithNavbarAndFooter() {
  // get categories
  const [categories, setCategories] = useState([]);

  // get services
  const [services, setServices] = useState([]);

  const [provider, setProvider] = useState([]);

  console.log(provider);

  useEffect(() => {
    getAllServicesByCategory().then((result) => {
      if (result) {
        setCategories(result);
        console.log("Processed services data:", result);
      } else {
        console.log("Failed to fetch and process services data.");
      }
    });
  }, []);

  useEffect(() => {
    getAllServices().then((result) => {
      if (result) {
        setServices(result);
        console.log("Processed services data:", result);
      } else {
        console.log("Failed to fetch and process services data.");
      }
    });
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getProvider = async (userId) => {
    try {
      const response = await axios.get(
        `https://i-connect-wj57.onrender.com/api/user/${userId}`
      );
      const data = response.data;
      setProvider(data);
      console.log("called");
    } catch (error) {
      console.log(error);
    }
  };

  let logoutTimer; // Variable to store the logout timer

  const handleUserActivity = () => {
    clearTimeout(logoutTimer); // Reset the logout timer
    logoutTimer = setTimeout(handleLogout, 30 * 60 * 1000); // Set the logout timer to 30 minutes
  };

  // Event listeners to track user activity
  document.addEventListener("mousemove", handleUserActivity); // Mouse movement
  document.addEventListener("keypress", handleUserActivity); // Keyboard activity

  // Logout logic
  const handleLogout = () => {
    // reset local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("activePage");

    // Redirect to login page or any other appropriate action
    window.location.href = "/"; // Redirect to login page
  };

  // Call handleUserActivity initially to start monitoring user activity
  handleUserActivity();

  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<Home categories={categories} />} />
        {/* Home route nested within Layout */}
        <Route
          path="categories"
          element={
            <Categories categories={categories} getProvider={getProvider} />
          }
        />
        <Route
          path="categories/:id"
          element={
            <SingleCategory categories={categories} getProvider={getProvider} />
          }
        />
        <Route
          path="vendor/:vendorId"
          element={<Vendor services={services} provider={provider} />}
        />
        <Route path="add-service" element={<AddServicesForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
