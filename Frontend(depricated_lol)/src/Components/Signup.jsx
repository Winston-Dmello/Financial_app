import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){
    localStorage.clear()
    const navigate = useNavigate();
    const [alert, setAlert] = useState("");
    async function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(document.getElementById("myForm"));
    let details = JSON.stringify(Object.fromEntries(formData));
    console.log(details);

    try {
        const response = await fetch("https://ideal-parakeet-jvxwrgjqq5xcqv44-8000.app.github.dev/register_user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: details,
        });

        if (response.status == 200) {
            navigate("/Login");
            console.log("Works");
          } else if (response.status == 409) {
            setAlert("User already Exists!");
          } else {
            setAlert("Submission failed. Try again.");
          }
        } catch (error) {
          setAlert("An error occurred during form submission!");
        }
    }

    function Close(){
        setAlert("");
    }

    return (
      <div>
        <h2>Sign up</h2>
        <form id="myForm" onSubmit={submitForm}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Sign up</button>
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
