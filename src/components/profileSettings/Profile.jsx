import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import noUser from "../../assets/svg/noUser.svg";
import Button from "../button/Button";

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
        console.error("Error uploading file:", error.message);
      }
    } else {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form">
        <div className="img-upload">
          <div className="img-display">
            {userData.imageUrl && userData.imageUrl != "null" ? (
              <img
                src={userData.imageUrl}
                alt="product image"
                className="img"
              />
            ) : (
              <img
                src={noUser}
                alt="product image"
                className="img"
              />
            )}
          </div>
          : imgUploading ? (<span>Uploading...</span>
          ) : (
          <img src={noUser} alt="" />)<span>Upload Image of work history</span>
          <label htmlFor="imageUrl">
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
              // required
            />
            <span className="button">{userData.imageUrl ? "Change" : ""}</span>
          </label>
          <span className={`error ${errors.imageUrl ? "active" : ""}`}>
            {errors.imageUrl}
          </span>
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
            value={`${userData.bio == "null" ? "" : userData.bio}`}
            onChange={handleChange}
          />
        </label>

        {editMode && (
          <div className="change-edit">
            <button type="submit" className="button">
              {isSubmitting ? "Updating..." : "Add Changes"}
            </button>
            <Button
              text="Revert Changes"
              type="secondary"
              onClick={() => setEditMode(false)}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
