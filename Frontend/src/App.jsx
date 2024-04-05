import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import About from './Components/About';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
