import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../forms/AuthForm";
import { useUser } from "../contexts/UserContext";

export default function Login() {

  const { setUserId } = useUser();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  async function submitForm(event) {
    event.preventDefault();
    const formElement = document.getElementById("myForm");
    let formdata = new FormData(formElement);
    let details = JSON.stringify(Object.fromEntries(formdata));

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: details,
      });
      if (response.status == 200) {
        const data = await response.json();
        let UserID = data.UserId;
        let Username = data.Username;
        console.log(`UserId: ${UserID} and UserName: ${Username}`);
        setUserId(UserID);
        navigate("/user-profile");
        console.log("Login successful!");
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
  return (
    <>
      <AuthForm title="Login" onSubmitForm={submitForm} destination="signup" />
    </>
  );
}
