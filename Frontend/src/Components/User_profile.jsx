import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/login.css";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [alert, setAlert] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    ph_no: "",
    bank: "",
    ifsc: "",
    balance: 0,
    age: 0,
  });
  const userId = localStorage.getItem("UserID");

  /*
  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/${userId}/profile/`);
      if (response.ok) {
        const userProfileData = await response.json();
        setUserProfile(userProfileData);
        setFormData(userProfileData);
      } else {
        console.error("Failed to fetch user profile data");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching user profile data:",
        error
      );
    }
  };
*/

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/${userId}/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setAlert("User profile updated successfully");
      } else if (response.status == 412) {
        setAlert("User profile already exists!");
      } else {
        setAlert("Failed to update user profile");
      }
    } catch (error) {
      console.error("An error occurred while updating user profile:", error);
    }
  };
  function Close() {
    setAlert("");
  }

  return (
    <div>
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <section class="container">
          <div class="profile">
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
        </section>
      </main>
      {alert && (
        <div>
          <p>{alert}</p>
          <button onClick={Close}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
