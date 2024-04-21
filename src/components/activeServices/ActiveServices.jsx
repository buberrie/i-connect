/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Button from "../button/Button";
import "./style.css";
import axios from "axios";
import imgUpload from "../../assets/svg/img-upoad.svg";

const ActiveServices = ({ services }) => {
  const { user } = useUser();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  const [formData, setFormData] = useState({
    description: "",
    pricing: "",
    location: "",
    imageUrl: null,
  });

  // console.log(formData);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEditBtn = async (id) => {
    setEditId(id);
    try {
      const response = await axios.get(
        `https://i-connect-wj57.onrender.com/api/services/${id}`
      );
      if (response.data) {
        const categoryToEdit = response.data;

        setFormData({
          description: categoryToEdit?.description,
          pricing: categoryToEdit?.pricing,
          location: categoryToEdit?.location,
          imageUrl: categoryToEdit?.imageUrl,
        });
        setEditMode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.description.trim()) {
      errors.description =
        "Description of your service/product can not be empty";
    } else if (formData.description.length < 70 || formData.description.length > 80) {
      errors.description = 'Description of your service/product should be between 70 - 80 characters';
    }

    if (!formData.pricing.trim()) {
      errors.pricing = "Price is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.imageUrl) {
      errors.imageUrl = "An image description of your work can not be empty";
    }

    return errors;
  };

  const [imgUploading, setImgUploading] = useState(false);
  const preset_key = "xdo62zo5";

  const handleEditChange = async (e) => {
    if (e.target.name === "imageUrl") {
      // show that the img is upoading
      setImgUploading(true);
      // Update the imageUrl with the file
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);

      try {
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dghjggjpn/upload",
          formData
        );
        // Extract URL of the uploaded file from Cloudinary response
        const imageUrl = cloudinaryResponse.data.secure_url;

        console.log(imageUrl);

        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: imageUrl,
        }));

        setErrors({ ...errors, imageUrl: '' });

        setImgUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));

      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData); // Validate all fields at once

    // Update errors state and prevent submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      // Check if there are any errors
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `https://i-connect-wj57.onrender.com/api/services/${editId}`,
        formData
      );
      if (response.status === 200) {
        alert("Service updated");
        setEditMode(false); // Exit edit mode after successful update
        setEditId(null); // reset details after successful update
        setIsSubmitting(false);
      } else {
        alert("oops! Something went wrong please try again later");
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("An unexpected error occurred. Please try again later.");
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="providers">
      {services
        .filter((service) => service.vendor?._id === user._id)
        .map(
          (item) =>
            !editMode && (
              <div
                key={item._id}
                className={`service-provider-card ${!editMode ? "active" : ""}`}>
                <div className="img-container">
                  <img src={item.imageUrl} alt="business image" className="active-img"/>
                </div>
                <h3>
                  Price: {item.pricing === 0 ? "Negotiable" : item.pricing}
                </h3>
                <p>{item.description}</p>
                <div className="change-btn">
                  <Button
                    text="Edit"
                    type="secondary"
                    onClick={() => {
                      handleEditBtn(item._id);
                    }}
                  />
                  <Button text="Delete" type="danger" />
                </div>
              </div>
            )
        )}

      {editMode && (
        <div className={`edit-service-container ${editMode ? "active" : ""}`}>
          <h3>Edit Service/Product</h3>
          <form onSubmit={(e) => handleEdit(e)} className="add-service-form">
            <label htmlFor="">
          Edit Description
          <textarea
            className="textarea overflow"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleEditChange}
            placeholder="Tell us more about your service/product"
            // required
          />
           <span className={`error ${errors.description ? "active" : ""}`}>
            {errors.description}
          </span>
        </label>

            <label htmlFor="">
              Edit pricing:
              <div className="pricing">
                <label className="radio-wrapper">
                  <input
                    type="radio"
                    name="pricing"
                    value="0"
                    checked={formData.pricing == "0" || null}
                    onChange={handleEditChange}
                    onClick={() => setIsFixed(false)}
                  />
                  Negotiable
                  <span className="custom-radio"></span>
                </label>
                <label className="radio-wrapper">
                  <input
                    type="radio"
                    name="pricing"
                    value=""
                    checked={formData.pricing != "0"}
                    onChange={handleEditChange}
                    // onClick={() => setIsFixed(true)}
                  />
                  Fixed
                  <span className="custom-radio"></span>
                </label>
              </div>
              {(isFixed || formData.pricing != "0") && (
                <input
                  className="inputPrice input"
                  type="number"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleEditChange}
                  placeholder="Enter fixed price"
                  // required
                />
              )}
              <span className={`error ${errors.pricing ? "active" : ""}`}>
                {errors.pricing}
              </span>
            </label>

            <label htmlFor="location">
              Edit service location
              <input
                className="input location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleEditChange}
                placeholder="State, Country"
                // required
              />
              <span className={`error ${errors.location ? "active" : ""}`}>
                {errors.location}
              </span>
            </label>

            <div className="img-upload input">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="product image"
                  className="img-preview"
                />
              ) : imgUploading ? (
                <span>Uploading...</span>
              ) : (
                <img src={imgUpload} alt="" />
              )}
              <span>Upload Image of work history</span>
              <label htmlFor="imageUrl">
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  onChange={handleEditChange}
                />
                <span className="button">
                  {formData.imageUrl ? "Change" : "Browse"}
                </span>
              </label>
              <span className={`error ${errors.ImageUrl ? "active" : ""}`}>
                {errors.ImageUrl}
              </span>
            </div>

            <div className="change-edit">
              <button type="submit" className="button">
                {isSubmitting ? "Processing..." : "Update Service/product"}
              </button>
              <Button
                text="Cancel Edit"
                type="danger"
                onClick={() => setEditMode(false)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ActiveServices;
