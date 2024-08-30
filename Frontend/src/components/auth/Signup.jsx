import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../forms/AuthForm";
import { POSTFUNC } from "../utils/Utils";

export default function Signup() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  async function submitForm(event) {

    event.preventDefault();
    const response = await POSTFUNC("myForm","register_user/","Sign up form submission");
    console.log(response);

    if (response.status == 200) {
      navigate("/login");
    } else if (response.status == 409) {
      console.log("User already Exists!");
    } else {
      console.log("Submission failed. Try again.");
    }
  }

  return (
    <>
      <AuthForm title="Sign up" onSubmitForm={submitForm} destination="login" />
    </>
  );
}
