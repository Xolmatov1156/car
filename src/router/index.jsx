import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
// import Home from '../pages/Dashboard/Home';
import Category from '../pages/Dashboard/Category';
import Sidebar from '../components/Sidebar';
import Brand from '../pages/Dashboard/Brand';
import City from '../pages/Dashboard/City';

const CustomRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="flex">
      {location.pathname !== '/' && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/category" element={<Category />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/city' element={<City/>} />
      </Routes>
    </div>
  );
};

export default CustomRoutes;
