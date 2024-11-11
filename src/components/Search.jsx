import React from "react";
import SearchIcon from '../assets/search.svg';

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="flex relative">
    <input
      type="text"
      className="border border-gray-400 pr-8 pl-3 h-[40px] w-[200px] lg:w-[300px] rounded-lg outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <img src={SearchIcon} alt="search" className="w-[22px] h-[22px] absolute right-1 top-2.5"/>
  </div>
);

export default SearchInput;
