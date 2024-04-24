import "./style.css";
import Logo from "../../assets/svg/Logo.svg";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import dropdown from "../../assets/svg/dropdown.svg";
import userIcon from "../../assets/svg/user.svg";
import menu from "../../assets/svg/menu.svg";
import close from "../../assets/svg/closeIcon.svg";
import { useState } from "react";

const NavBar = () => {
  const { user } = useUser();

  const [profileOpen, setProfileOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Logout logic
  const handleLogout = () => {
    // reset local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("activePage");

    // Redirect to login page or any other appropriate action
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <>
      <nav className="">
        <div className="ham-menu" onClick={() => setShowNav(true)}>
          <img src={menu} alt="nav menu" />
        </div>
        <Link to="/">
          <img src={Logo} alt="i-connect" />
        </Link>
        <div className="nav-items" >
          <div className={`ul-wrapper ${showNav ? "active" : ""}`} onClick={() => setShowNav(false)}>
          <ul>
            <li>
            <div className="ham-menu close-menu">
            <img src={close} alt="close menu" />
            </div>
            </li>
            <li>
              <Link to="/" className="a" >Home</Link>
            </li>
            <li>
              <Link to="/categories" className="a">Category</Link>
            </li>
            <li>
              <Link to="/"  className="a">Contact Us</Link>
            </li>
            <li>
            {!user && <div className="action-btns-mobile">
              <Link to="/loginsignup">
                <Button text="Sign Up" />
              </Link>
              <Link to="/loginsignup">
                <Button type="secondary" text="Log in" />
              </Link>
            </div>}
            </li>
          </ul>
          </div>
          {user ? (
            <div>
              <div className="user" onClick={() => setProfileOpen(!profileOpen)}>
                <img src={user?.imageUrl && user?.imageUrl !== "null" ? user.imageUrl : userIcon} alt="user" className="userIcon" />
                <div>
                  <p className="user-name">{user.first_Name}</p>
                </div>
                <img src={dropdown} alt="dropdown" className={` drop ${profileOpen ? "open" : ""} `} />
              </div>
              <ul className={` ul-profile ${profileOpen ? "open" : ""} `} onClick={() => setProfileOpen(false)}>
                <li>
                    <Link to='dashboard'>Dashboard</Link>
                </li>
                <li>Work History</li>
                <li>Settings</li>
                <li>Help</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          ) : (
            <div className="action-btns">
              <Link to="/loginsignup">
                <Button text="Sign Up" />
              </Link>
              <Link to="/loginsignup" className="login">
                <Button type="secondary" text="Log in" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
