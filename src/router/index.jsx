import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Dashboard/Home';
import Category from '../pages/Dashboard/Category';
import Sidebar from '../components/Sidebar';
import Brand from '../pages/Dashboard/Brand';

const CustomRoutes = () => {
  const location = useLocation();

  return (
    <div className="flex">
      {location.pathname !== '/' && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path='/brand' element={<Brand />} />
      </Routes>
    </div>
  );
};

export default CustomRoutes;
