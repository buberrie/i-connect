import { useState } from "react";
import axios from "axios";
import { useUser } from '../../context/UserContext'

function AddServicesForm() {
    const { user } = useUser();

    const preset_key = "xdo62zo5";

  const [formData, setFormData] = useState({
    
    category: "",
    subCategory: "",
    description: "",
    pricing: "",
    location: "",
    imageUrl: null, 
  });

  console.log(formData)

  const handleChange = async (e) => {
    if (e.target.name === "imageUrl") {
      // Update the imageUrl with the file
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", preset_key)

      try {
        const cloudinaryResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dghjggjpn/upload',
            formData);
    
          // Extract URL of the uploaded file from Cloudinary response
          const imageUrl = cloudinaryResponse.data.secure_url;

          console.log(imageUrl)

          setFormData(prevFormData => ({ ...prevFormData, "imageUrl": imageUrl }));
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }

    } else {
      setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
    }
  };


  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    try {
        const response = await axios.post(
          `https://i-connect-wj57.onrender.com/api/services/${userId}/register`,
          formData
        );

        if (response.status === 200) {
            alert('service added')
        } else {
            console.log('error:', response.data.message)
        }

      } catch (error) {
        console.error('Error adding service:', error);
        throw error; // Rethrow the error to handle it in the component
      }
  };

  return (
    <div>
      <h2>Add Service</h2>
      <form onSubmit={(e) => handleSubmit(e, user._id)}>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="text"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          placeholder="SubCategory"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="pricing"
          value={formData.pricing}
          onChange={handleChange}
          placeholder="Pricing"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input type="file" name="imageUrl" onChange={handleChange} required />

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddServicesForm;
