import React, { useState } from "react";
import AccountMenu from "./AccountMenu";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchbar/Search2";
import { FaRegUserCircle } from "react-icons/fa";
import AdminIcon from "./rolesvgs/admin.svg"; 
// import Tier1Icon from "./rolesvgs/tier1.svg";
// import Tier2Icon from "./rolesvgs/tier2.svg";
// import Tier3Icon from "./rolesvgs/tier3.svg";

const Navbar = ({ userRole }) => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setOpen(!isOpen);
  };

  const handleSubscribe = () => {
    navigate("/subscription");
  };

  const renderUserIcon = () => {
    switch (userRole) {
      // case "admin":
      //   return <img src={AdminIcon} size={35} className="cursor-pointer" onClick={handleIconClick} alt="Admin Icon" />;
      default:
        return <FaRegUserCircle size={35} className="cursor-pointer" onClick={handleIconClick} />;
      
    }
  };
  
  const renderSubscriptionButton = () => {
    switch (userRole) {
      case "tier4":
        return (
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleSubscribe}>
            Subscribe
          </button>
        );
      case "tier3":
        return (
          <div className="group">
            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-4 relative">
              Basic
              <span className="absolute top-full left-0 mt-1 px-2 py-1 font-normal  bg-yellow-700  hover:bg-yellow-500 hover:text-gray-900 hover:font-medium text-xs text-white rounded upgrade-text opacity-0 transition-opacity duration-300 group-hover:opacity-100"onClick={handleSubscribe}>Upgrade</span>
            </button>
          </div>
        );
      case "tier2":
        return (
          <div className="group">
            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-4 relative">
              Standard
              <span className="absolute top-full left-0 mt-1 px-2 py-1 font-normal bg-yellow-700  hover:bg-yellow-500 hover:text-gray-900 hover:font-medium text-xs text-white rounded upgrade-text opacity-0 transition-opacity duration-300 group-hover:opacity-100"onClick={handleSubscribe}>Upgrade</span>
            </button>
          </div>
        );
      case "tier1":
        return (
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-4">
            Premium
          </button>
        );
      default:
        return (
          <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleSubscribe}>
            Subscribe
          </button>
        );
    }
  };
  
  

  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8 w-full absolute top-0 z-50 shadow- border-none">
      
      <div className="flex items-center justify-start max-w-6xl gap-16">
      <div
          className="text-red-600  font-bold cursor-pointer flex items-center "
          onClick={() => navigate("/")}
        >
          <span className="text-5xl">K</span>
          <span className="text-[43px]">G</span>
          <span className="text-[38px]">P</span>
          <span className="text-[38px]">L</span>
          <span className="text-[43px]">A</span>
          <span className="text-5xl">Y</span>
        </div>
      </div>
        <SearchBar />
   
        {renderSubscriptionButton()}
    
      <div className="flex">
        <div className="mr-4">
          {renderUserIcon()}
        </div>
        <div className="absolute right-0 mt-10 z-50">
          <AccountMenu isOpen={isOpen} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
