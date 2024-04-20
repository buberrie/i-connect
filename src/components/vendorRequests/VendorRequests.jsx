import axios from "axios";
import Button from "../button/Button";
import "./style.css";
import { useState } from "react";

/* eslint-disable react/prop-types */
const VendorRequests = ({ user, requests, services, users }) => {
  const [activeService, setActiveService] = useState(null);

  function handleActiveService(serviceId) {
    setActiveService((prevActiveService) =>
      prevActiveService === serviceId ? null : serviceId
    );
  }

  // Filter the bookings array to get bookings specific to the vendorId
  const bookingsForVendor = requests.filter(
    (booking) => booking.vendorId === user?._id
  );

  const bookingsForSeeker = requests.filter(
    (booking) => booking.customerId === user?._id
  );

  // Group the filtered vendor's bookings by vendorServiceId
  const bookingsGroupedByServiceId = bookingsForVendor.reduce(
    (groupedBookings, booking) => {
      const serviceId = booking.vendorServiceId;
      const existingServiceIndex = groupedBookings.findIndex(
        (item) => item.serviceId === serviceId
      );
      if (existingServiceIndex === -1) {
        // If the service doesn't exist in the array, add it
        groupedBookings.push({ serviceId, bookings: [booking] });
      } else {
        // If the service already exists, push the booking to its array
        groupedBookings[existingServiceIndex].bookings.push(booking);
      }
      return groupedBookings;
    },
    []
  );

  // Group the filtered customer's bookings by vendorId
  const bookingsGroupedByVendorId = bookingsForSeeker.reduce(
    (groupedBookings, booking) => {
      const vendorId = booking.vendorId;
      const existingVendorIndex = groupedBookings.findIndex(
        (item) => item.vendorId === vendorId
      );
      if (existingVendorIndex === -1) {
        // If the service doesn't exist in the array, add it
        groupedBookings.push({ vendorId, bookings: [booking] });
      } else {
        // If the service already exists, push the booking to its array
        groupedBookings[existingVendorIndex].bookings.push(booking);
      }
      return groupedBookings;
    },
    []
  );

  const acceptBooking = async (serviceId) => {
    try {
      const response = await axios.put(
        `https://i-connect-wj57.onrender.com/api/booking/acceptBooking/${serviceId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to update status");
      }
      alert("Congratulations on accepting a request!");
      window.location.reload();
    } catch (error) {
      console.log("server error:", error);
    }
  };

  const completeBooking = async (serviceId) => {
    try {
      const response = await axios.put(
        `https://i-connect-wj57.onrender.com/api/booking/completeBooking/${serviceId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to update status");
      }
      alert("Congratulations on completing a request!");
      window.location.reload();
    } catch (error) {
      console.log("server error:", error);
    }
  };

  const cancelBooking = async (serviceId) => {
    try {
      const response = await axios.put(
        `https://i-connect-wj57.onrender.com/api/booking/cancelBooking/${serviceId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to update status");
      }
      alert("Aww, you have cancelled a request");
      window.location.reload();
    } catch (error) {
      console.log("Server error:", error);
    }
  };

  console.log(bookingsGroupedByServiceId);
  // console.log(bookingsForSeeker);
  // console.log(bookingsForVendor);

  return (
    <main>
      <div></div>

      <div>
        {user?.role.toLowerCase() === "vendor" &&
          bookingsGroupedByServiceId.map((serviceBooked) => (
            <div key={serviceBooked.serviceId} className="service-requested">
              {/* Fetch and display service details */}

              {services?.map(
                (service) =>
                  service._id === serviceBooked.serviceId && (
                    <div key={service._id} className="service-detail">
                      <div className="service-detail-img-div">
                        <img
                          src={service.imageUrl}
                          alt={service.subCategory}
                          className="service-detail-img"
                        />
                      </div>
                      <div className="service-detail-text">
                        <h3>Service Name: {service.subCategory}</h3>
                        <p>Pricing: &#8358; {service.pricing}</p>
                        <p>Description: {service.description}</p>
                        <div className="all-status">
                          <div className="align-length">
                            <p>Pending:</p>
                            <div className="order-length pending">{serviceBooked.bookings
                    .filter((order) => order.status.toLowerCase() === "pending").length
                    }</div>
                          </div>
                          <div className="align-length">
                            <p>In-Progress:</p>
                            <div className="order-length in-progress">{serviceBooked.bookings
                    .filter((order) => order.status.toLowerCase() === "in-progress").length
                    }</div>
                          </div>
                          <div className="align-length">
                            <p>Completed:</p>
                            <div className="order-length completed">{serviceBooked.bookings
                    .filter((order) => order.status.toLowerCase() === "completed").length}</div>
                          </div>
                          <div className="align-length">
                            <p>Cancelled:</p>
                            <div className="order-length canceled">{serviceBooked.bookings
                    .filter((order) => order.status.toLowerCase() === "cancelled").length}</div>
                          </div>
                          <Button
                            text={` ${
                              activeService === serviceBooked.serviceId
                                ? "Close"
                                : "View"
                            } `}
                            onClick={() =>
                              handleActiveService(serviceBooked.serviceId)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}

              <div
                className={`intrested-customer ${
                  activeService === serviceBooked.serviceId ? "active" : ""
                }`}>
                {/* Fetch and display customer details */}
                <h2>Intrested Customers</h2>

                {/* get all pending order */}
                <div className="order-request pending">
                  <h3>Status: Pending</h3>
                  {serviceBooked.bookings
                    .filter((order) => order.status.toLowerCase() === "pending")
                    .map((order) => (
                      <div key={order._id} className="customer-detail">
                        {/* <h3>Customer ID: {order.customerId}</h3> */}
                        {users?.map(
                          (customer) =>
                            customer._id === order.customerId && (
                              <div key={customer._id}>
                                <h4>Customer Contact</h4>
                                <p>Customer Name: {customer.username}</p>
                                <p>Customer Email: {customer.email}</p>
                              </div>
                            )
                        )}
                        <div className="btn-accept">
                        <Button
                          text="Accept"
                          onClick={() => {
                            acceptBooking(order._id);
                          }}
                        />
                        <Button
                          type="danger"
                          text="Reject"
                          onClick={() => {
                            cancelBooking(order._id);
                          }}
                        />
                        </div>
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() === "pending"
                  ).length === 0 && (
                    <div>
                      <p>You have no pending order/booking</p>
                    </div>
                  )}
                </div>

                {/* orders that has been accepted and are in-progress */}
                <div className="order-request in-progress">
                  <h3>Status: In-progress</h3>
                  {serviceBooked.bookings
                    .filter(
                      (order) => order.status.toLowerCase() === "in-progress"
                    )
                    .map((order) => (
                      <div key={order._id} className="customer-detail">
                        {/* <h3>Customer ID: {order.customerId}</h3> */}
                        {users?.map(
                          (customer) =>
                            customer._id === order.customerId && (
                              <div key={customer._id}>
                                <h4>Customer Contact</h4>
                                <p>Customer Name: {customer.username}</p>
                                <p>Customer Email: {customer.email}</p>
                              </div>
                            )
                        )}
                        <Button
                          text="Completed"
                          onClick={() => {
                            completeBooking(order._id);
                          }}
                        />
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() === "in-progress"
                  ).length === 0 && (
                    <div>
                      <p>You no order/booking in-progress</p>
                    </div>
                  )}
                </div>

                <div className="order-request completed">
                  {/* completed orders */}
                  <h3>Status: Completed</h3>
                  {serviceBooked.bookings
                    .filter(
                      (order) => order.status.toLowerCase() === "completed"
                    )
                    .map((order) => (
                      <div key={order._id} className="customer-detail">
                        {/* <h3>Customer ID: {order.customerId}</h3> */}
                        {users?.map(
                          (customer) =>
                            customer._id === order.customerId && (
                              <div key={customer._id}>
                                <h4>Customer Contact</h4>
                                <p>Customer Name: {customer.username}</p>
                                <p>Customer Email: {customer.email}</p>
                              </div>
                            )
                        )}
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() === "completed"
                  ).length === 0 && (
                    <div>
                      <p>You no completed Request</p>
                    </div>
                  )}
                </div>

                <div className="order-request cancelled">
                  {/* completed orders */}
                  <h3>Status: cancelled</h3>
                  {serviceBooked.bookings
                    .filter(
                      (order) => order.status.toLowerCase() === "cancelled"
                    )
                    .map((order) => (
                      <div key={order._id} className="customer-detail">
                        {/* <h3>Customer ID: {order.customerId}</h3> */}
                        {users?.map(
                          (customer) =>
                            customer._id === order.customerId && (
                              <div key={customer._id}>
                                <h4>Customer Contact</h4>
                                <p>Customer Name: {customer.username}</p>
                                <p>Customer Email: {customer.email}</p>
                              </div>
                            )
                        )}
                        <p>Status: {order.status}</p>
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() === "cancelled"
                  ).length === 0 && (
                    <div>
                      <p>You have no cancelled request </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* seekers/customer's screen */}
      {user?.role.toLowerCase() === "customer" &&
        bookingsGroupedByVendorId.map((vendorBooked) => (
          <div key={vendorBooked.serviceId}>
            {/* Fetch and display each vendor and services booked from them */}
            <h2>Vendor Details</h2>
            {users?.map(
              (customer) =>
                customer._id === vendorBooked.customerId && (
                  <div key={customer._id}>
                    <h4>service details</h4>
                    <h3>customer Name: {customer.username}</h3>
                    <p>customer email: {customer.email}</p>
                  </div>
                )
            )}

            {/* Fetch and display customer details */}
            <h2>Customer Details</h2>
            {vendorBooked.bookings.map((order) => (
              <div key={order._id}>
                {/* <h3>Services ID: {order.customerId}</h3> */}
                {services?.map(
                  (service) =>
                    service._id === order.serviceId && (
                      <div key={service._id}>
                        <h3>Service Name: {service.subCategory}</h3>
                        <p>Description: {service.description}</p>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ))}
    </main>
  );
};

export default VendorRequests;
