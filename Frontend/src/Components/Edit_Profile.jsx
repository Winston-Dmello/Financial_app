import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    ph_no: "",
    bank: "",
    ifsc: "",
    balance: "",
    age: ""
  });
  const { userId } = useParams();

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/profile/${userId}`);
      if (response.ok) {
        const userProfileData = await response.json();
        setFormData(userProfileData);
      } else {
        console.error("Failed to fetch user profile data");
      }
    } catch (error) {
      console.error("An error occurred while fetching user profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8000/profile/${userId}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(formData),
           
        });
    
        if (response.ok) {
          console.log("Profile updated successfully");
    
          window.location.href = `/profile/${userId}`;
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("An error occurred while updating profile:", error);
      }
    };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={formData.name}
          />
        </div>
        <div>
          <label htmlFor="ph_no">Phone Number:</label>
          <input
            type="text"
            id="ph_no"
            name="ph_no"
            value={formData.ph_no}
            onChange={handleInputChange}
            placeholder={formData.ph_no}
          />
        </div>
        <div>
          <label htmlFor="bank">Bank Name:</label>
          <input
            type="text"
            id="bank"
            name="bank"
            value={formData.bank}
            onChange={handleInputChange}
            placeholder={formData.bank}
          />
        </div>
        <div>
          <label htmlFor="ifsc">IFSC Code:</label>
          <input
            type="text"
            id="ifsc"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleInputChange}
            placeholder={formData.ifsc}
          />
        </div>
        <div>
          <label htmlFor="balance">Balance:</label>
          <input
            type="text"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleInputChange}
            placeholder={formData.balance}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder={formData.age}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
