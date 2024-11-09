import React from 'react'
import { NavLink } from 'react-router-dom'
import CategoryIcon from '../assets/category.svg'
import Home from '../assets/home.svg'
import BrandIcon from '../assets/brand.svg'

const Sidebar = () => {
  return (
    <div className='w-[250px] h-screen bg-gray-900'>
      <div className="text-white flex justify-center pt-8 text-3xl font-semibold">
        Adminka
      </div>
      <div className="mt-10">
        <nav className="flex flex-col gap-4">
          <NavLink 
            to={'/home'} 
            className={`text-white w-full rounded-lg p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={Home} 
              alt="Home" 
              className="w-[24px] h-[24px] transition-transform duration-300" 
            />
            <span className="font-medium">Home</span>
          </NavLink>

          <NavLink 
            to={'/category'} 
            className={`text-white w-full rounded-lg p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={CategoryIcon} 
              alt="Category" 
              className="w-[24px] h-[24px] transition-transform duration-300" 
            />
            <span className="font-medium">Category</span>
          </NavLink>

          <NavLink 
            to={'/brand'} 
            className={`text-white w-full rounded-lg p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={BrandIcon} 
              alt="Brand" 
              className="w-[24px] h-[24px] transition-transform duration-300" 
            />
            <span className="font-medium">Brand</span>
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
