import React from 'react'
import { NavLink } from 'react-router-dom'
import CategoryIcon from '../assets/category.svg'
import BrandIcon from '../assets/brand.svg'
import Cities from '../assets/cities.svg'
import Location from '../assets/location.svg'

const Sidebar = () => {
  
  return (
    <div className='w-[250px] h-screen bg-gray-900'>
      <div className="text-white flex justify-center pt-8 text-3xl font-semibold">
        Auto Admin
      </div>
      <div className="mt-10">
        <nav className="flex flex-col gap-4">

          <NavLink 
            to={'/category'} 
            className={`text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={CategoryIcon} 
              alt="Category" 
              className="w-[20px] h-[20px] transition-transform duration-300" 
            />
            <span className="font-medium">Category</span>
          </NavLink>

          <NavLink 
            to={'/brand'} 
            className={`text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={BrandIcon} 
              alt="Brand" 
              className="w-[20px] h-[20px] transition-transform duration-300" 
            />
            <span className="font-medium">Brand</span>
          </NavLink>
          <NavLink 
            to={'/city'} 
            className={`text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={Cities} 
              alt="Brand" 
              className="w-[20px] h-[20px] transition-transform duration-300" 
            />
            <span className="font-medium">City</span>
          </NavLink>
          <NavLink 
            to={'/location'} 
            className={`text-white w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-all duration-300`}
          >
            <img 
              src={Location} 
              alt="Brand" 
              className="w-[20px] h-[20px] transition-transform duration-300" 
            />
            <span className="font-medium">Location</span>
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
