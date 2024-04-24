import axios from "axios";
import Button from "../button/Button";
import "./style.css";
import { useState } from "react";
import noUser from "../../assets/svg/noUser.svg";

/* eslint-disable react/prop-types */
const VendorRequests = ({ user, requests, services, users }) => {
  const [activeService, setActiveService] = useState(null);

  const [processing, setProcessing] = useState(null);

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
    setProcessing(true);
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
    setProcessing(true);
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
    setProcessing(true);
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

  console.log(bookingsGroupedByVendorId);
  // console.log(bookingsForSeeker);
  // console.log(bookingsForVendor);

  return (
    <main className="request-main">
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
                        <div className="service-name">
                          <h3 className="capitalize">{service.subCategory}</h3>
                          <p className="p">
                            Pricing:{" "}
                            <span className="text-bold">
                              {service.pricing === 0
                                ? "Negotiable"
                                : `₦${service.pricing}`}
                            </span>
                          </p>
                          <p>{service.description}</p>
                        </div>
                        <div className="all-status">
                          <div className="align-length">
                            <p>Pending:</p>
                            <div className="order-length pending">
                              {
                                serviceBooked.bookings.filter(
                                  (order) =>
                                    order.status.toLowerCase() === "pending"
                                ).length
                              }
                            </div>
                          </div>
                          <div className="align-length">
                            <p>In-Progress:</p>
                            <div className="order-length in-progress">
                              {
                                serviceBooked.bookings.filter(
                                  (order) =>
                                    order.status.toLowerCase() === "in-progress"
                                ).length
                              }
                            </div>
                          </div>
                          <div className="align-length">
                            <p>Completed:</p>
                            <div className="order-length completed">
                              {
                                serviceBooked.bookings.filter(
                                  (order) =>
                                    order.status.toLowerCase() === "completed"
                                ).length
                              }
                            </div>
                          </div>
                          <div className="align-length">
                            <p>Cancelled:</p>
                            <div className="order-length canceled">
                              {
                                serviceBooked.bookings.filter(
                                  (order) =>
                                    order.status.toLowerCase() === "cancelled"
                                ).length
                              }
                            </div>
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
                <h3>Interested Customers</h3>

                {/* all pending order */}
                <div className="order-request pending">
                  <div className="order-request-status pending">Pending</div>
                  {serviceBooked.bookings
                    .filter((order) => order.status.toLowerCase() == "pending")
                    .map((order, index) => (
                      <div
                        key={order._id}
                        className={` customer-detail ${
                          index !== 0 ? "border" : ""
                        }`}>
                        {/* <h3>Customer ID: {order.customerId}</h3> */}
                        {users?.map(
                          (customer) =>
                            customer._id === order.customerId && (
                              <div
                                key={customer._id}
                                className="customer-contact-img">
                                <div className="customer-image">
                                  <img
                                    src={
                                      customer.imageUrl &&
                                      customer.imageUrl != "null"
                                        ? customer.imageUrl
                                        : noUser
                                    }
                                    alt={`${customer.username} Image`}
                                  />
                                </div>
                                <div className="customer-contact">
                                  <p className="capitalize">
                                    {" "}
                                    Name:{" "}
                                    <span className="text-bold">
                                      {customer.first_Name} {customer.last_Name}{" "}
                                      <span className="user_name">
                                        {" "}
                                        {customer.username}
                                      </span>
                                    </span>
                                  </p>
                                  {/* <p className="capitalize">Username: <span className="text-bold">{customer.username}</span></p> */}
                                  <p>
                                    Phone Number:{" "}
                                    <span className="text-bold">
                                      {customer.phone}
                                    </span>
                                  </p>
                                  <p>
                                    Email Address:{" "}
                                    <span className="text-bold">
                                      {customer.email}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                        <div className="btn-accept">
                          <Button
                            text={` ${
                              processing === order._id
                                ? "Processing..."
                                : "Accept"
                            } `}
                            onClick={() => {
                              acceptBooking(order._id);
                            }}
                            processing={processing}
                          />
                          <Button
                            type="danger"
                            text={` ${
                              processing === order._id
                                ? "Processing..."
                                : "Reject"
                            } `}
                            onClick={() => {
                              cancelBooking(order._id);
                            }}
                            processing={processing}
                          />
                        </div>
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() == "pending"
                  ).length === 0 && (
                    <div className="no-order">
                      <p>You have no pending order/booking</p>
                    </div>
                  )}
                </div>

                {/* orders that has been accepted and are in-progress */}
                <div className="order-request in-progress">
                  <div className="order-request-status in-progress">
                    In-Progress
                  </div>
                  {serviceBooked.bookings
                    .filter(
                      (order) => order.status.toLowerCase() == "in-progress"
                    )
                    .map((order) => (
                      <div key={order._id} className="customer-detail">
                        {/* <h3>Customer ID: {order.customerId}</h3> */}
                        {users?.map(
                          (customer) =>
                            customer._id === order.customerId && (
                              <div
                                key={customer._id}
                                className="customer-contact-img">
                                <div className="customer-image">
                                  <img
                                    src={
                                      customer.imageUrl &&
                                      customer.imageUrl != "null"
                                        ? customer.imageUrl
                                        : noUser
                                    }
                                    alt={`${customer.username} Image`}
                                  />
                                </div>
                                <div className="customer-contact">
                                  <p className="capitalize">
                                    {" "}
                                    Name:{" "}
                                    <span className="text-bold">
                                      {customer.first_Name} {customer.last_Name}{" "}
                                      <span className="user_name">
                                        {" "}
                                        {customer.username}
                                      </span>
                                    </span>
                                  </p>
                                  {/* <p className="capitalize">Username: <span className="text-bold">{customer.username}</span></p> */}
                                  <p>
                                    Phone Number:{" "}
                                    <span className="text-bold">
                                      {customer.phone}
                                    </span>
                                  </p>
                                  <p>
                                    Email Address:{" "}
                                    <span className="text-bold">
                                      {customer.email}
                                    </span>
                                  </p>
                                  {/* <p>
                                    Location:{" "}
                                    <span className="text-bold">
                                      {customer.location}
                                    </span>
                                  </p> */}
                                </div>
                              </div>
                            )
                        )}
                        <div className="btn-accept">
                          <Button
                            text={` ${
                              processing === order._id
                                ? "Processing..."
                                : "Completed"
                            } `}
                            onClick={() => {
                              completeBooking(order._id);
                            }}
                            processing={processing}
                          />
                        </div>
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() == "in-progress"
                  ).length === 0 && (
                    <div className="no-order">
                      <p>You have no order/booking in-progress</p>
                    </div>
                  )}
                </div>

                {/* completed orders */}
                <div className="order-request completed">
                  <div className="order-request-status completed">
                    Completed
                  </div>
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
                              <div
                                key={customer._id}
                                className="customer-contact-img">
                                <div className="customer-image">
                                  <img
                                    src={
                                      customer.imageUrl &&
                                      customer.imageUrl != "null"
                                        ? customer.imageUrl
                                        : noUser
                                    }
                                    alt={`${customer.username} Image`}
                                  />
                                </div>
                                <div className="customer-contact">
                                  <p className="capitalize">
                                    {" "}
                                    Name:{" "}
                                    <span className="text-bold">
                                      {customer.first_Name} {customer.last_Name}{" "}
                                      <span className="user_name">
                                        {" "}
                                        {customer.username}
                                      </span>
                                    </span>
                                  </p>
                                  {/* <p className="capitalize">Username: <span className="text-bold">{customer.username}</span></p> */}
                                  <p>
                                    Phone Number:{" "}
                                    <span className="text-bold">
                                      {customer.phone}
                                    </span>
                                  </p>
                                  <p>
                                    Email Address:{" "}
                                    <span className="text-bold">
                                      {customer.email}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() == "completed"
                  ).length === 0 && (
                    <div className="no-order">
                      <p>You have no completed Request</p>
                    </div>
                  )}
                </div>

                {/* cancelled orders */}
                <div className="order-request cancelled">
                  <div className="order-request-status cancelled">
                    Cancelled
                  </div>
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
                              <div
                                key={customer._id}
                                className="customer-contact-img">
                                <div className="customer-image">
                                  <img
                                    src={
                                      customer.imageUrl &&
                                      customer.imageUrl != "null"
                                        ? customer.imageUrl
                                        : noUser
                                    }
                                    alt={`${customer.username} Image`}
                                  />
                                </div>
                                <div className="customer-contact">
                                  <p className="capitalize">
                                    {" "}
                                    Name:{" "}
                                    <span className="text-bold">
                                      {customer.first_Name} {customer.last_Name}{" "}
                                      <span className="user_name">
                                        {" "}
                                        {customer.username}
                                      </span>
                                    </span>
                                  </p>
                                  {/* <p className="capitalize">Username: <span className="text-bold">{customer.username}</span></p> */}
                                  <p>
                                    Phone Number:{" "}
                                    <span className="text-bold">
                                      {customer.phone}
                                    </span>
                                  </p>
                                  <p>
                                    Email Address:{" "}
                                    <span className="text-bold">
                                      {customer.email}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    ))}
                  {serviceBooked.bookings.filter(
                    (order) => order.status.toLowerCase() == "cancelled"
                  ).length === 0 && (
                    <div className="no-order">
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
          <div key={vendorBooked.vendorId} className="service-requested">
            {/* Fetch and display each vendor and services booked from them */}
            {users && users?.map(
              (vendor) =>
                vendor._id === vendorBooked.vendorId && (
                  <div key={vendor._id} className="service-detail">
                    <div className="vendor-customer-image">
                      <img
                        src={
                          vendor.imageUrl && vendor.imageUrl != "null"
                            ? vendor.imageUrl
                            : noUser
                        }
                        alt={`${vendor.username} Image`}
                      />
                    </div>
                    <div className="vendor-detail-text">
                      <div className="customer-contact">
                        <p className="capitalize">
                          {" "}
                          Name:{" "}
                          <span className="text-bold">
                            {vendor.first_Name} {vendor.last_Name}{" "}
                            <span className="user_name">
                              {" "}
                              {vendor.username}
                            </span>
                          </span>
                        </p>
                        {/* <p className="capitalize">Username: <span className="text-bold">{vendor.username}</span></p> */}
                        <p>
                          Phone Number:
                          <span className="text-bold"> {vendor.phone}</span>
                        </p>
                        <p>
                          Email Address:
                          <span className="text-bold"> {vendor.email}</span>
                        </p>
                        <p>
                          Location:
                          <span className="text-bold"> {vendor.location}</span>
                        </p>
                      </div>

                      <div className="all-status all-status-customer">
                        <div className="align-length">
                          <p>Pending:</p>
                          <div className="order-length pending">
                            {
                              vendorBooked.bookings.filter(
                                (order) =>
                                  order.status.toLowerCase() === "pending"
                              ).length
                            }
                          </div>
                        </div>
                        <div className="align-length">
                          <p>In-Progress:</p>
                          <div className="order-length in-progress">
                            {
                              vendorBooked.bookings.filter(
                                (order) =>
                                  order.status.toLowerCase() === "in-progress"
                              ).length
                            }
                          </div>
                        </div>
                        <div className="align-length">
                          <p>Completed:</p>
                          <div className="order-length completed">
                            {
                              vendorBooked.bookings.filter(
                                (order) =>
                                  order.status.toLowerCase() === "completed"
                              ).length
                            }
                          </div>
                        </div>
                        <div className="align-length">
                          <p>Cancelled:</p>
                          <div className="order-length canceled">
                            {
                              vendorBooked.bookings.filter(
                                (order) =>
                                  order.status.toLowerCase() === "cancelled"
                              ).length
                            }
                          </div>
                        </div>
                        <Button
                          text={` ${
                            activeService === vendorBooked.vendorId
                              ? "Close"
                              : "View"
                          } `}
                          onClick={() =>
                            handleActiveService(vendorBooked.vendorId)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
            )}

            <div
              className={`intrested-customer ${
                activeService === vendorBooked.vendorId ? "active" : ""
              }`}>
              {/* Fetch and display customer details */}
              <h3>Services From Vendor</h3>

              {vendorBooked.bookings.map((order, index) => (
                <div key={order._id} className={`service-vendor-detail ${index === 0 ? "first" : "active"}`}>
                  <div className={`order-request-status ${order.status.toLowerCase()} capitalize vendor-order-status`}>
                    {order.status}
                  </div>
                  {services?.map(
                    (service) =>
                      service._id === order.vendorServiceId && (
                        <div key={service._id} className="service-vendor-detail-img">
                          <div className="service-detail-img-div">
                            <img
                              src={service.imageUrl}
                              alt={service.subCategory}
                              className="service-detail-img"
                            />
                          </div>
                          <div className="service-vendor-text">
                            <div className="service-name">
                              <h3 className="capitalize">
                                {service.subCategory}
                              </h3>
                              <p className="p">
                                Pricing:{" "}
                                <span className="text-bold">
                                  {service.pricing == 0
                                    ? "Negotiable"
                                    : `₦${service.pricing}`}
                                </span>
                              </p>
                              <p>{service.description}</p>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </main>
  );
};

export default VendorRequests;
