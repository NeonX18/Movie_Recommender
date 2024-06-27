import React from "react";

const MenuItem = ({ onClick, label, className }) => {
  return (
    <div
      className={`px-1 py-3 hover:bg-neutral-200 mb-2 bg-white transition font-semibold text-center rounded-lg cursor-pointer  ${className}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
