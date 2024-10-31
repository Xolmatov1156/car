import React from 'react'
import Login from '../pages/Login/Login'
import Home from '../pages/Dashboard/Home'
import { Route, Router, Routes } from 'react-router-dom'
const CustomRoutes = () => {
  return (
    <Routes>
        <Route  path="/" element={<Login />} />
        <Route  path="/home" element={<Home />} />
    </Routes>
  )
}

export default CustomRoutes