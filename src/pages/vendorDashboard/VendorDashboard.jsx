import NavBar from "../../components/navbar/NavBar";
import { sidebarItems } from "../../constants";
import "./style.css";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import AddService from "../../components/addService/AddService";
import {
  getAllRequests,
  getAllServices,
  getAllServicesByCategory,
  getAllUsers,
} from "../../APIs";
import userProfile from "../../assets/svg/profilepic.svg";
import ActiveServices from "../../components/activeServices/ActiveServices";
import Billing from "../../components/billing/Billing";
import VendorRequests from "../../components/vendorRequests/VendorRequests";
import Profile from "../../components/profileSettings/Profile";

const VendorDashboard = () => {
  const { user } = useUser();

  const [active, setActive] = useState(1);

  // all categories
  const [categories, setCategories] = useState([]);

  // get services
  const [services, setServices] = useState([]);

  // all requests/order/bookings
  const [requests, setRequests] = useState([]);

  // get all users, this would be used to get customers aand vendors
  const [users, setUsers] = useState({});

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

  useEffect(() => {
    getAllRequests().then((result) => {
      if (result) {
        setRequests(result);
        console.log("Requests fetched successfully:", result);
      } else {
        console.log("Failed to fetched requests");
      }
    });
  }, []);

  useEffect(() => {
    getAllUsers().then((users) => {
      if (users) {
        setUsers(users);
        console.log("Users:", users);
      } else {
        console.log("Failed to fetch users");
      }
    });
  }, []);

  useEffect(() => {
    const activePage = localStorage.getItem("activePage");
    if (activePage !== null) {
      setActive(activePage);
    }
  }, [])

  console.log(active)

  const handleSidebarItems = (id) => {    
    setActive(id);
    localStorage.setItem("activePage", id);
  };

  const currentYear = new Date().getFullYear();

  return (
    <main>
      <NavBar />
      <div className="dashboard">
        {/* <div className="sidebar overflow">
          <div className="profile">
            <div className="img">
              <img
                src={user?.imageUrl && user?.imageUrl !== "null" ? user?.imageUrl : userProfile}
                alt={user?.username}
              />
            </div>
            <div>
              <h3>
                {user?.first_Name} {user?.last_Name} / {user?.username}
              </h3>
              <small>Update and Manage your Account</small>
            </div>
          </div>
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${active && active == item.id ? "active" : ""}`}
              onClick={() => handleSidebarItems(item.id)}>
              <p>{item.name}</p>
              <span className={ active == item.id ? "active" : ""}>&gt;</span>
            </div>
          ))}
        </div> */}
        <div className="content">
          <div className="content-padding">
            {sidebarItems.map((item) => (
              <h2 key={item.id} className="title">
                {active == item.id && <p>{item.name}</p>}
              </h2>
            ))}
            <div className={`inner-content ${active && active !== 0  ? "visible" : ""}`}>
              {active && active == 1 && <Profile user={user} />}
              {active && active == 2 && <AddService categories={categories} />}
              {active && active == 3 && <ActiveServices services={services} />}
              {active && active == 4 && (
                <VendorRequests
                  user={user}
                  requests={requests}
                  services={services}
                  users={users}
                />
              )}
              {active && active == 8 && <Billing user={user} />}
            </div>
          </div>
          <footer className="footer-dash">
            <span>
              Copyright © Service Connect {currentYear}. All Rights Reserved.
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default VendorDashboard;
