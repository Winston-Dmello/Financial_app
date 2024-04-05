import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [alert, setAlert] = useState("");
  const [formData, setFormData] = useState({});
  let userId = localStorage.getItem("UserID");
  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/${userId}/edit_profile`
      );
      if (response.ok) {
        const userProfileData = await response.json();
        setFormData(userProfileData);
      } else {
        console.log("Failed!");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching user profile data:",
        error
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/${userId}/edit_profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setAlert("Profile updated successfully");
      } else {
        setAlert("Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };
  function Close() {
    setAlert("");
  }
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
            placeholder={formData["Name"]}
            onChange={handleInputChange}
            value={formData.name}
            required
          />
        </div>
        <div>
          <label htmlFor="ph_no">Phone Number:</label>
          <input
            type="text"
            id="ph_no"
            name="ph_no"
            placeholder={formData["Ph_no"]}
            onChange={handleInputChange}
            value={formData.ph_no}
            required
          />
        </div>
        <div>
          <label htmlFor="bank">Bank Name:</label>
          <input
            type="text"
            id="bank"
            name="bank"
            placeholder={formData["Bank"]}
            onChange={handleInputChange}
            value={formData.bank}
            required
          />
        </div>
        <div>
          <label htmlFor="ifsc">IFSC Code:</label>
          <input
            type="text"
            id="ifsc"
            name="ifsc"
            placeholder={formData["Ifsc"]}
            onChange={handleInputChange}
            value={formData.ifsc}
            required
          />
        </div>
        <div>
          <label htmlFor="balance">Balance:</label>
          <input
            type="text"
            id="balance"
            name="balance"
            placeholder={formData["Balance"]}
            onChange={handleInputChange}
            value={formData.balance}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            placeholder={formData["Age"]}
            onChange={handleInputChange}
            value={formData.age}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {alert && (
        <div>
          <p>{alert}</p>
          <button onClick={Close}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
