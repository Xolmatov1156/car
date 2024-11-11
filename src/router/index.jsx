import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Category from '../pages/Admin/Category';
import Sidebar from '../components/Sidebar';
import Brand from '../pages/Admin/Brand';
import City from '../pages/Admin/City';
import Location from '../pages/Admin/Location';
import Car from '../pages/Admin/Car';
import Model from '../pages/Admin/Model';

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
        <Route path="/category" element={<Category />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/city' element={<City/>} />
        <Route path='/location' element={<Location/>} />
        <Route path='/car' element={<Car/>} />
        <Route path='/model' element={<Model/>} />
      </Routes>
    </div>
  );
};

export default CustomRoutes;
