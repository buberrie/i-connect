import "./style.css";
import footerLogo from "../../assets/svg/footer-logo.svg";
import instagramLogo from "../../assets/svg/instagram.svg";
import twitterLogo from "../../assets/svg/twitter.svg";
import facebookLogo from "../../assets/svg/facebook.svg";
import linkedinLogo from "../../assets/svg/linkedin.svg";
import Button from "../button/Button";

const Footer = () => {
  return (
    <>
      <footer className="padding-y">
        <div className="logo-items">
          <img src={footerLogo} alt="footer logo" />
          <p>
            we are always ready to help by providing the best service for you.
            We believe o live can make your life better.
          </p>
          <div className="social-icon">
            <a href="#" className="icon"><img src={instagramLogo} alt="" /></a>
            <a href="#" className="icon"><img src={facebookLogo} alt="" /></a>
            <a href="#" className="icon"><img src={twitterLogo} alt="" /></a>
            <a href="#" className="icon"><img src={linkedinLogo} alt="" /></a>
          </div>
        </div>

        <ul>
          <li>Quick Links</li>
          <li className="footer-li"><a href="#">Home</a></li>
          <li className="footer-li"><a href="#">About Us</a></li>
          <li className="footer-li"><a href="#">Our Mission</a></li>
          <li className="footer-li"><a href="#">Services</a></li>
          <li className="footer-li"><a href="#">Testimonials</a></li>
          <li className="footer-li"><a href="#">Support</a></li>
        </ul>

        <ul>
          <li className="footer-li"><a href="#">Category</a></li>
          <li className="footer-li"><a href="#">All Categories</a></li>
          <li className="footer-li"><a href="#">Fashion</a></li>
          <li className="footer-li"><a href="#">Connect</a></li>
          <li className="footer-li"><a href="#">Blog</a></li>
          <li className="footer-li"><a href="#">Contact Us</a></li>
        </ul>

        <div className="subscribe">
          <span className="title-footer">Subscribe</span>
          <p>Subscribe to get our newsletter and stay updated with us </p>
          <div className="subscribe-input">
            <input type="text" placeholder="Email address"/>
            <Button text='Subscribe' type='tertiary' className='sub-btn' />
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
