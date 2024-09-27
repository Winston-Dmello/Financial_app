import React from "react";
import { useNavigate } from "react-router-dom";

function AuthForm({ title, onSubmitForm, destination }) {  //Props 
  const navigate = useNavigate();
  return (
    <div>
      <h2>{title}</h2>
      <form id="myForm" onSubmit={onSubmitForm}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p onClick={() => navigate("/" + destination)}>
        Click here to {destination}!
      </p>
    </div>
  );
}

export default AuthForm;



