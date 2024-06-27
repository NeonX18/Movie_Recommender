import React from "react";

const Footer = () => {
  return (
    <div className="bg-black h-60 sm:w-full p-8 border-t-[1px] border-t-gray-600">
      <div
        className="text-red-600 text-4xl font-bold cursor-pointer"
        onClick={() => window.location.reload()}
      >
        KGPLAY
      </div>
    </div>
  );
};

export default Footer;
