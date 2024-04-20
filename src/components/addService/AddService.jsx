/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import "./style.css";
import imgUpload from "../../assets/svg/img-upoad.svg";

const AddService = ({ categories }) => {

  const { user } = useUser();
  const [imgUploading, setImgUploading] = useState(false);
  const preset_key = "xdo62zo5";

  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    description: '',
    pricing: '',
    location: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  console.log(formData);

  const handleChange = async (e) => {
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
    // Clear validation for the changed field
    setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.category.trim() || formData.subCategory.toLowerCase() === 'others') {
      errors.category = 'Category is required';
    }
  
    if (!formData.subCategory.trim()) {
      errors.subCategory = 'Subcategory is required';
    } 
  
    if (!formData.description.trim()) {
      errors.description = 'Description of your serivice/product is required';
    } else if (formData.description.length < 70 || formData.description.length > 80) {
      errors.description = 'Description of your service/product should be between 70 - 80 characters';
    }
  
    if (!formData.pricing.trim()) {
      errors.pricing = 'Pricing is required';
    }
  
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
  
    if (!formData.imageUrl) {
      errors.imageUrl = 'An image description of your work is required';
    }
  
    return errors;
  };
  

  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    const newErrors = validateForm(formData); // Validate all fields at once

    // Update errors state and prevent submission if there are errors
    if (Object.keys(newErrors).length > 0) { // Check if there are any errors
      setErrors(newErrors);
      alert('Please validate all feilds before you proceed')
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `https://i-connect-wj57.onrender.com/api/services/${userId}/register`,
        formData
      );

      if (response.status === 200) {
        alert("service added");
        setIsSubmitting(false);
      } else {
        console.log("error:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="add-service-container">
      <form
        onSubmit={(e) => handleSubmit(e, user._id)}
        className="add-service-form">
        <label htmlFor="category">
          category
          <select
            className="select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onClick={() => setIsInputFocused(false)}
            //   required
          >
            <option value="">select</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.id}
              </option>
            ))}
            <option value="others">Others</option>
          </select>
          {(formData.category === "others" || isInputFocused) && (
            <input
              className="input"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onFocus={() => setIsInputFocused(true)}
              placeholder="Enter category"
              //   required
            />
          )}
          <span className={`error ${errors.category ? "active" : ""}`}>
            {errors.category}
          </span>
        </label>

        <label htmlFor="">
          Subcategory
          <input
            className="input"
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="Enter subcategeory"
            // required
          />
           <span className={`error ${errors.subCategory ? "active" : ""}`}>
            {errors.subCategory}
          </span>
        </label>

        <label htmlFor="">
          Description
          <textarea
            className="textarea overflow"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about your service/product"
            // required
          />
           <span className={`error ${errors.description ? "active" : ""}`}>
            {errors.description}
          </span>
        </label>

        <label htmlFor="">
          pricing:
          <div className="pricing">
            <label className="radio-wrapper">
              <input
                type="radio"
                name="pricing"
                value="0"
                // checked={formData.pricing === "0"}
                onChange={handleChange}
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
                // checked={formData.pricing === }
                onChange={handleChange}
                onClick={() => setIsFixed(true)}
              />
              Fixed
              <span className="custom-radio"></span>
            </label>
          </div>
          {isFixed && (
            <input
              className="inputPrice input"
              type="number"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              placeholder="Enter fixed price"
              // required
            />
          )}
           <span className={`error ${errors.pricing ? "active" : ""}`}>
            {errors.pricing}
          </span>
        </label>

        <label htmlFor="location">
          service location
          <input
            className="input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="State,Country"
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
              onChange={handleChange}
              // required
            />
            <span className="button">
              {formData.imageUrl ? "Change" : "Browse"}
            </span>
          </label>
          <span className={`error ${errors.imageUrl ? "active" : ""}`}>
            {errors.imageUrl}
          </span>
        </div>

        <button type="submit" className="button">
              {isSubmitting ? "Processing..." : "Upload Service/Product"}
          </button>
      </form>
    </div>
  );
};

export default AddService;
