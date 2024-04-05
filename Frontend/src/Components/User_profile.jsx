import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
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
        setUserProfile(userProfileData);
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
      const response = await fetch(`http://localhost:8000/Profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("User profile updated successfully");
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("An error occurred while updating user profile:", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
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
            placeholder="Enter your phone number"
            required
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
            placeholder="Enter your bank name"
            required
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
            placeholder="Enter your IFSC code"
            required
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
            placeholder="Enter your balance"
            required
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
            placeholder="Enter your age"
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
  
};

export default UserProfile;
