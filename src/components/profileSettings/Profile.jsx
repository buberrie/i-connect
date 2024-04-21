import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import noUser from "../../assets/svg/noUser.svg";
import Button from "../button/Button";
import fileUpload from "../../assets/svg/file-upload.svg";

/* eslint-disable react/prop-types */
const Profile = ({ user }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const preset_key = "xdo62zo5";

  const [userData, setUserData] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    phone: "",
    username: "",
    location: "",
    role: "",
    password: "",
    imageUrl: "",
    bio: "",
    availability: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        first_Name: user.first_Name,
        last_Name: user.last_Name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        location: user.location,
        role: user.role,
        password: user.password,
        imageUrl: user.imageUrl,
        bio: user.bio,
        availability: user.availability,
      });
    }
  }, [user]);

  console.log(userData);

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

        setUserData((prevFormData) => ({
          ...prevFormData,
          imageUrl: imageUrl,
        }));
        setErrors({ ...errors, imageUrl: "" });

        setImgUploading(false);
      } catch (error) {
        alert("oops! we something went wrong please try again later");
        setImgUploading(false);
        console.error("Error uploading file:", error.message);
      }
    } else {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Clear validation for the changed field
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = (userData) => {
    const errors = {};

    if (!userData.first_Name.trim()) {
      errors.first_Name = "First name can not be empty";
    }

    if (!userData.last_Name.trim()) {
      errors.last_Name = "Last name can not be empty";
    }

    if (!userData.email.trim()) {
      errors.email = "Email address can not be empty";
    }

    if (!userData.phone.trim() || userData.phone.length < 11) {
      errors.phone = "Invalid phone number";
    }

    if (!userData.username.trim()) {
      errors.username = `${
        user.role.toLowerCase() == "vendor" ? "Business name" : "Username"
      } is required`;
    }

    if (
      userData.username.trim() &&
      (userData.bio.length < 150 || userData.bio.length > 200)
    ) {
      errors.bio = "Your Bio should be between 100 - 150 characters";
    }

    if (!userData.imageUrl || userData.imageUrl == "null") {
      errors.imageUrl = "Please upload an Image of self or brand";
    }

    return errors;
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    console.log("called");

    if (editMode === false) {
      setEditMode(true);
      return;
    }

    const newErrors = validateForm(userData); // Validate all fields at once

    // Update errors state and prevent submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      // Check if there are any errors
      setErrors(newErrors);
      alert("Please validate all feilds before you proceed");

      setTimeout(() => {
        window.location.href = "#top";
      }, 150);

      return;
    }

    setIsSubmitting(true);
    setEditMode(false);

    try {
      const response = await axios.put(
        `https://i-connect-wj57.onrender.com/api/user/update/${user._id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile Updated successfully!");
        window.location.reload();
      } else {
        alert("oops! Something went wrong please try again later");
        console.error("profile update failed:", response.data.message);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
      console.log("local error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="edit-profile-container">
      <div id="top"></div>
      <form className="edit-profile-form" onSubmit={handleEdit}>
        <div className="img-upload">
          <div className="img-upload-detail">
            <div className="img-display">
              {userData.imageUrl && userData.imageUrl != "null" ? (
                <img
                  src={userData.imageUrl}
                  alt="product image"
                  className="img"
                />
              ) : (
                <img src={noUser} alt="product image" className="img" />
              )}
            </div>
            <div>
              <h3>Profile Image</h3>
              <p>Update your photo and personal details</p>
              <label htmlFor="imageUrl" className="img-label">
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  onChange={handleChange}
                  //   readOnly={!editMode}
                />
                <img src={fileUpload} alt="upload image" />{" "}
                <span>
                  {imgUploading
                    ? "Uploading..."
                    : userData.imageUrl && userData.imageUrl == "null"
                    ? "Upload Image"
                    : "Change Image"}
                </span>
              </label>

              <span className={`error ${errors.imageUrl ? "active" : ""}`}>
                {errors.imageUrl}
              </span>
            </div>
          </div>

          <div className="change-edit">
            <button type="submit" className="button" disabled={isSubmitting}>
              {!editMode
                ? "Edit Profile"
                : (isSubmitting
                ? "Updating..."
                : "Add Changes")}
            </button>
            {editMode && (
              <Button
                text="Revert Changes"
                type="secondary"
                onClick={() => setEditMode(false)}
              />
            )}
          </div>
        </div>

        <div className="edit-profile-name">
          <label htmlFor="first_Name">
            First Name
            <input
              type="text"
              id="first_Name"
              name="first_Name"
              className="input"
              readOnly={!editMode}
              value={userData.first_Name}
              onChange={handleChange}
            />
            <span className={`error ${errors.first_Name ? "active" : ""}`}>
              {errors.first_Name}
            </span>
          </label>

          <label htmlFor="last_Name">
            Last Name
            <input
              type="text"
              id="last_Name"
              name="last_Name"
              className="input"
              readOnly={!editMode}
              value={userData.last_Name}
              onChange={handleChange}
            />
            <span className={`error ${errors.last_Name ? "active" : ""}`}>
              {errors.last_Name}
            </span>
          </label>
        </div>

        <label htmlFor="username">
          {` ${
            user?.role.toLowerCase() === "vendor"
              ? "Bussiness Name"
              : "Username"
          }`}
          <input
            type="text"
            id="username"
            name="username"
            className="input"
            readOnly={!editMode}
            value={userData.username}
            onChange={handleChange}
          />
          <span className={`error ${errors.lastname ? "active" : ""}`}>
            {errors.lastname}
          </span>
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            readOnly={!editMode}
            value={userData.email}
            onChange={handleChange}
          />
          <span className={`error ${errors.email ? "active" : ""}`}>
            {errors.email}
          </span>
        </label>

        <label htmlFor="phone">
          Phone
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input"
            readOnly={!editMode}
            value={userData.phone}
            onChange={handleChange}
          />
          <span className={`error ${errors.phone ? "active" : ""}`}>
            {errors.phone}
          </span>
        </label>

        <label htmlFor="bio">
          About
          <textarea
            type="text"
            id="bio"
            name="bio"
            readOnly={!editMode}
            className="textarea overflow"
            placeholder="Let your audience know a little about you"
            value={`${
              userData.bio && userData.bio == "null" ? "" : userData.bio
            }`}
            onChange={handleChange}
          />
          <span className={`error ${errors.bio ? "active" : ""}`}>
            {errors.bio}
          </span>
        </label>
      </form>
    </div>
  );
};

export default Profile;
