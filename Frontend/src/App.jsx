import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import UserProfile from './components/features/userprofile/UserProfile'
import ProfilePage from './components/features/userprofile/ProfilePage'
import { AddCategory, DeleteCategory, UpdateCategory } from './components/features/categories/Categories'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path='/profile-page' element={<ProfilePage/>}/>
        <Route path='/category' element={<DeleteCategory/>}/>
      </Routes>
    </>
  ) 
}

export default App
