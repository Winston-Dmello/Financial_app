import React from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  localStorage.clear();
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleAbout = () => {
    navigate("/about");
  };
}
