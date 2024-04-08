import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  localStorage.clear();
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(document.getElementById("myForm"));
    let details = Object.fromEntries(formData);
    console.log(details);

    try {
      const response = await fetch("https://ideal-parakeet-jvxwrgjqq5xcqv44-8000.app.github.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (response.status == 200) {
        const data = await response.json();
        let UserID = data.UserId;
        let Username = data.Username;
        console.log(`UserId: ${UserID} and UserName: ${Username}`);
        console.log("Works");
        localStorage.setItem("UserID", UserID);
        console.log(UserID);
        localStorage.setItem("Username", Username);
        navigate("/home");
        setAlert("Login Successful! Redirecting user to Home");
      } else if (response.status == 407) {
        setAlert("User Doesn't Exist!");
      } else if (response.status == 401) {
        setAlert("Password doesn't match!");
      } else {
        setAlert("Submission failed. Try again.");
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred during form submission", error);
    }
  }
  function Close() {
    setAlert("");
  }

  return (
    <div>
      <h2>Login</h2>
      <form id="myForm" onSubmit={submitForm}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Login</button>
      </form>
      {alert && (
        <div>
          <p>{alert}</p>
          <button onClick={Close}>Close</button>
        </div>
      )}
    </div>
  );
}
