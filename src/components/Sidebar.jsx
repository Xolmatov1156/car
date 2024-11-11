import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '../assets/category.svg';
import BrandIcon from '../assets/brand.svg';
import Cities from '../assets/cities.svg';
import Location from '../assets/location.svg';
import CarIcon from '../assets/car.svg';
import Model from '../assets/model.svg';
import Logout from '../assets/logout.svg';
import Settings from '../assets/setting.svg';

const Sidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    window.localStorage.clear();
    setTimeout(() => {
      window.location.reload();
      navigate("/");
    }, 100);
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="w-[250px] h-screen bg-gray-900">
      <div className="text-white flex justify-center pt-8 text-3xl font-semibold">
        Admin
      </div>
      <div className="mt-10">
        <nav className="flex flex-col gap-4">
          <NavLink to="/category" className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={CategoryIcon} alt="Category" className="w-[18px] h-[18px] transition-transform duration-300" />
            <span className="font-medium">Categories</span>
          </NavLink>
          <NavLink to="/brand" className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={BrandIcon} alt="Brand" className="w-[20px] h-[20px] transition-transform duration-300" />
            <span className="font-medium">Brands</span>
          </NavLink>
          <NavLink to="/city" className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={Cities} alt="Cities" className="w-[20px] h-[20px] transition-transform duration-300" />
            <span className="font-medium">Cities</span>
          </NavLink>
          <NavLink to="/model" className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={Model} alt="Model" className="w-[20px] h-[30px] transition-transform duration-300" />
            <span className="font-medium">Models</span>
          </NavLink>
          <NavLink to="/car" className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={CarIcon} alt="Car" className="w-[20px] h-[20px] transition-transform duration-300" />
            <span className="font-medium">Cars</span>
          </NavLink>
          <NavLink to="/location" className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={Location} alt="Location" className="w-[20px] h-[20px] transition-transform duration-300" />
            <span className="font-medium">Locations</span>
          </NavLink>
          <button className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={Settings} alt="Settings" className="w-[18px] h-[17px]" /> Settings
          </button>
          <button onClick={handleLogoutClick} className="text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300">
            <img src={Logout} alt="Logout" className="w-[18px] h-[17px]" /> Log out
          </button>
        </nav>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsLogoutModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={confirmLogout} className="bg-red-500 text-white px-4 py-2 rounded">Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
