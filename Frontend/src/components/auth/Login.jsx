import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../forms/AuthForm";
import { useUser } from "../contexts/UserContext";
import { POSTFUNC } from "../utils/Utils";

export default function Login() {

  const { setUserId } = useUser();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  async function submitForm(event) {
    event.preventDefault();

    const response = await POSTFUNC("myForm","login/","POST","Login form submission");    
      if (response.status == 200) {
        let UserID = response.UserId;
        let Username = response.Username;
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
    } 
  return (
    <>
      <AuthForm title="Login" onSubmitForm={submitForm} destination="signup" />
    </>
  );
}
