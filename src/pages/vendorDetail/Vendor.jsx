/* eslint-disable react/prop-types */
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import star from "../../assets/svg/star.svg";
import phone from "../../assets/svg/phone.svg";
import mail from "../../assets/svg/mail.svg";
import location from "../../assets/svg/location.svg";
import tag from "../../assets/svg/tag.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { useUser } from "../../context/UserContext";
import noImage from "../../assets/images/noImage.png"

const Vendor = ({ services, provider }) => {

  const navigate = useNavigate();

  const { vendorId } = useParams();

  const { user } = useUser();

  const [currentProvider, setCurrentProvider] = useState({});

  const [booking, setBooking] = useState({
    customerId: null,
    vendorId: null,
    vendorServiceId: null,
    dateTime: "",
    status: "booked",
  });

  const [adToBook, setAdToBook] = useState(null)

  const bookingDetail = (serviceId) => {
    if( !user) {
      navigate('/loginsignup'); // Redirect to the '/new-page' path
      
      return
    } 

    if (user._id === vendorId) {
      alert("Oops! Invalid request. Can't contact self")

      return
    }

    setBooking({
      ...booking,
      customerId: user._id,
      vendorId: vendorId,
      vendorServiceId: serviceId,
      dateTime: new Date(),
      status: "booked",
    });

    setTimeout(() => {
      window.location.href = '#book';
     }, 150);
  };

  useEffect(() => {
    const adToBook = services.find(
      (service) => service?._id === booking.vendorServiceId
    );
    setAdToBook(adToBook);
  }, [booking.vendorServiceId, services]);
  

  const bookService = async () => {
    
    try {
      const response = await axios.post(
        "https://i-connect-wj57.onrender.com/api/booking/booked",
        booking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert('Service Booked Successfully!')
        window.location.reload()
      } else {
        alert("oops! Service booking failed, please try again later");
      }
    } catch (error) {
      console.error("Error booking:", error.message);
      // Display error message to user
      alert("An unexpected error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    getProvider(vendorId);
  }, []);

  const getProvider = async (userId) => {
    try {
      const response = await axios.get(
        `https://i-connect-wj57.onrender.com/api/user/${userId}`
      );
      const data = response.data;
      setCurrentProvider(data);
      console.log("called");
    } catch (error) {
      console.log(error);
    }
  };

  let providerCurrent;

  if (provider.length == 0) {
    providerCurrent = currentProvider;
  } else {
    providerCurrent = provider;
  }

  // console.log(providerCurrent);

  if (!provider) {
    return <div>Provider not found</div>;
  }

  return (
    <main className="provider-container">
      <section className="provider">
        <h2>Service Provider Information</h2>
        <div className="provider-bio">
          <div className="personal-details">
            <div className="img">
              <img
                src={providerCurrent.imageUrl && providerCurrent.imageUrl != "null" ? providerCurrent.imageUrl : noImage}
                alt={providerCurrent.username}
              />
            </div>
            <div className="contact-info">
              <div className="name-heading">
                <h2>{providerCurrent.username}</h2>
                <div>
                  <div
                    className={`avaliability ${
                      providerCurrent.availability?.toLowerCase() == "available"
                        ? "available"
                        : providerCurrent.availability?.toLowerCase() == "booked"
                        ? "booked"
                        : "away"
                    }`}></div>
                  <p>{providerCurrent.availability}</p>
                </div>
              </div>
              <p className="tag">
                <img src={tag} alt="category" /> {providerCurrent.cat}
              </p>
              <p className="rating">
                {providerCurrent.rating ? providerCurrent.rating : ""}
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
                <img src={star} alt="rating" />
              </p>
              <div className="contact">
                <h2>Contact Information</h2>
                <ul>
                  <li>
                    <span>
                      <img src={phone} alt="phone" /> {providerCurrent.phone}
                    </span>
                  </li>
                  <li>
                    <span>
                      <img src={mail} alt="mail" /> {providerCurrent.email}
                    </span>
                  </li>
                  <li>
                    <span>
                      <img src={location} alt="location" />{" "}
                      {providerCurrent.location}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {providerCurrent.intro && providerCurrent.intro != "null" && <div className="description">
            <h2>Description</h2>
            <p>{providerCurrent.intro}</p>
          </div>}

        </div>
      </section> 

      <section className="items">
        <div className="available-items">
          <h3>Active ads by this vendor</h3>
          <div>
            {services
              .filter((service) => service.vendor?._id === vendorId)
              .map((item) => (
                <div key={item._id} className="item">
                  <div className="img-avaliable">
                    <img src={item.imageUrl} alt="item" />
                  </div>
                  <div className="item-detail">
                  <div className="name-price"><h3>{item.subCategory}</h3> <p>{item.pricing == "0" ? "Negotiable" : `₦${item.pricing}`}</p></div>
                    <p>{item.description}</p>
                  </div>
                  <Button
                    text={`Contact Vendor`}
                    onClick={() => bookingDetail(item._id)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="other-services">
          <h3>Other Services</h3>
          <ul>
            {Array.from(
              new Set(
                services
                  .filter((category) => category.vendor?._id === vendorId)
                  .map((item) => item.subCategory)
              )
            ).map((uniqueSubCategory) => (
              <li key={uniqueSubCategory}>{uniqueSubCategory}</li>
            ))}
          </ul>
        </div>
      </section>

      {adToBook && (
        <section className="booking" id="book">
          <h3>Contact {providerCurrent.username}</h3>
          <p>
            {" "}
            You&apos;ve shown interest in one of <b>{providerCurrent.username}&apos;s</b> ads detailed below. We will inform them of your interest in one of their ads and connect you with them to discuss further.
          </p>

          <div className=" item-book">
            <div className="img-tobook">
              <img src={adToBook.imageUrl} alt="item" />
            </div>
            <div className="item-detail">
              <div className="name-price"><h3>{adToBook.subCategory}</h3> <p>{adToBook.pricing == "0" ? "Negotiable" : `₦${adToBook.pricing}`}</p></div>
                    <p className="ad-to-book-p">{adToBook.description}</p>
                  </div>
          </div>

          <div>
            <h3 className="book-contact-h3">Below are your contact details please ensure correctness.</h3>
            <div className="book-contact">
              <span>Email Address: </span>
              <b> {user.email ? user.email : 'No email address'}</b>
            </div>
            <div className="book-contact">
              <span>Phone Number: </span>
              <b> {user.phone ? user.phone : 'No phone number'}</b>
            </div>
          </div>

          <Button text="Continue" onClick={bookService}/>
        </section>
      )}
    </main>
  );
};

export default Vendor;
