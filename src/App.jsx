import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Otp from './pages/Otp'
import Cart from './pages/Cart'
import Address from './pages/Address'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/otp' element={<Otp />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/address' element={<Address />} />
    </Routes>
  )
}

export default App