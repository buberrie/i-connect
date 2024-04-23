/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.css";
import startDate from "../../assets/svg/start-date.svg";
import endDate from "../../assets/svg/end-date.svg";
import boost from "../../assets/svg/boost.svg";
import addIcon from "../../assets/svg/add-icon.svg";
import { gains, subscription } from "../../constants";

const Billing = ({ user }) => {
  // const [, setEmail] = useState("");
  // const [, setAmount] = useState("");
  const [subDetail, setSubDetail] = useState({
    email: user?.email,
    amount: null,
  });

  const date = new Date(user?.createdAt);

  // Get the day, short month, and year from the date object

  const day = date.getDate();

  let dayWithSuffix;
  if (day === 1 || day === 21 || day === 31) {
    dayWithSuffix = `${day}st`;
  } else if (day === 2 || day === 22) {
    dayWithSuffix = `${day}nd`;
  } else if (day === 3 || day === 23) {
    dayWithSuffix = `${day}rd`;
  } else {
    dayWithSuffix = `${day}th`;
  }

  const month = date.toLocaleString("default", { month: "short" }); // Get the short month name
  const year = date.getFullYear();

  const payWithPaystack = (e) => {
    e.preventDefault();

    let handler = window.PaystackPop.setup({
      key: "pk_test_2a7d0dcdab2eb0d125eac40f77fc1d7d77182499", // Replace with your public key
      email: subDetail.email,
      amount: subDetail.amount * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      // label: "Optional string that replaces customer email"
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message = "Payment complete! Reference:" + response.reference;
        alert(message);
      },
    });

    handler.openIframe();
  };

  function navigateToPay() {
    setTimeout(() => {
     window.location.href = '#paymentForm';
    }, 150);
 }


  return (
    <main>
      <div>
        <div className="billing-hero">
          <div className="billing-intro">
            <div className="boost-circle">
              <img src={boost} alt="" className="boost" />
            </div>
            <div className="boost-text">
              <h2>Boost Your Profile</h2>
              <p className="intro-boost">
                {" "}
                Elevate your skills and showcase your talent, connect with the
                audience you truly deserve through our Profile Boost feature!
              </p>
            </div>
          </div>
          <div className="current-sub">
            <h3>
              Current Subscription <span className="boost-inline">(Free: NGN 0)</span>
            </h3>
            <span className="sub-date start">
              {" "}
              <img src={startDate} alt="startDate" />
              Start Date:{" "}
              <span className="date">
                {" "}
                {user ? `${dayWithSuffix} ${month}, ${year}.` : "-- -- --"}{" "}
              </span>
            </span>
            <span className="sub-date end">
              <img src={endDate} alt="endDate" />
              End Date: <span className="date"> -- -- -- </span>
            </span>
          </div>
        </div>

        <div className="gain-div">
          {gains.map((gain) => (
            <div key={gain.id} className="boost-gain">
              <img src={addIcon} alt="add" />
              <h3>{gain.id}</h3>
              <p>{gain.text}</p>
            </div>
          ))}
        </div>

        <div className="subscription">
          <h3>Subscriptions</h3>
          <div className="sub-container">
            {subscription.map((sub) => (
              <label
                key={sub.id}
                htmlFor={sub.id}
                className={`sub-duration ${
                  subDetail.amount === sub.price ? "active" : ""
                }`}
                onClick={navigateToPay}>
                <input
                  type="radio"
                  id={sub.id}
                  name="duration"
                  onChange={() =>
                    setSubDetail((prev) => ({ ...prev, amount: sub.price }))
                  }
                />
                <span className="duration"></span>
                <h3>{sub.id}ly</h3>
                <p className="price">
                  {sub.price}
                  <span className="price-symbol">&#8358;</span>
                </p>
                <span>per {sub.id}</span>
                <p>{sub.text}</p>
              </label>
            ))}
          </div>
        </div>
      </div>

      {subDetail.amount && <form onSubmit={payWithPaystack} id="paymentForm">
        <h2>Make Payment</h2>
        <div className="form-group">
          <label htmlFor="email" className="label">Email Address</label>
          <input
            type="email"
            id="email-address"
            value={subDetail.email}
            className="input-billing"
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="label">Amount</label>
          <input
            type="amount"
            id="amount"
            value={subDetail.amount}
            required
            readOnly
            className="input-billing"
          />
        </div>
        <div className="form-submit">
          <button className="button" type="submit">
            Pay &#8358;{subDetail.amount}
          </button>
        </div>
      </form>}
    </main>
  );
};

export default Billing;
