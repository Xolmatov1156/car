import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[20%] h-screen bg-gray-900'>
      <h2 className='text-white flex justify-center pt-8 text-3xl'>Adminka</h2>
      <div>
      <nav>
        <NavLink  to={'/home'} className={`text-white w-[170px] rounded-lg mt-10 p-2 mx-auto bg-blue-500 flex`}>
          Home
        </NavLink>
        <NavLink to={'/category'} className={`text-white w-[170px] rounded-lg mt-[5px] p-2 mx-auto bg-blue-500 flex`}>
          Category
        </NavLink>
      </nav>
      </div>
    </div>
  )
}

export default Sidebar