import React from 'react';
import './App.css'
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import About from './Components/About';
import UserProfile from './Components/User_profile';
import EditProfile from './Components/Edit_Profile';
import Categories from './Components/Categories';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile/> }/>
        <Route path="/edit_profile" element={<EditProfile/> }/>
        <Route path="/categories" element={<Categories/> }/>
      </Routes>
    </>
  )
}

export default App

