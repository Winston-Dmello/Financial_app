import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../forms/AuthForm";
/**
 *Need to set the alert component
 *{alert && (
        <div>
          <p>{alert}</p>
          <button onClick={Close}>Close</button>
        </div>
      )}
 */

export default function Signup() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  async function submitForm(event) {
    event.preventDefault();
    const formElement = document.getElementById("myForm");
    let formData = new FormData(formElement);
    let details = JSON.stringify(Object.fromEntries(formData));
    console.log(details);

    try {
      const response = await fetch("http://localhost:8000/register_user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: details,
      });
      if (response.status == 200) {
        navigate("/login");
      } else if (response.status == 409) {
        setAlert("User already Exists!");
      } else {
        setAlert("Submission failed. Try again.");
      }
    } catch (error) {
      setAlert("An error occured!");
    }
  }

  return (
    <>
      <AuthForm title="Sign up" onSubmitForm={submitForm} destination="login" />
    </>
  );
}
