import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  [transactions, setTransactions] = useState(false);

  useEffect(() => {
    const fetchData = async (userId = "") => {
      try {
        const response = await fetch(
          `http://localhost:8000/${userId}/Get_Transaction`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setTransactions(data);
        } else {
          alert("Something went wrong Try Again Later!");
        }
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  return (
    <div>
      <h1>Welcome to Our Fintech App</h1>
      <p>Under Construction, Please come back again</p>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleAbout}>About</button>
    </div>
  );
}
