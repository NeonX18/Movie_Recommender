import React from "react";

const Heading1 = ({ title, subtitle, center, titleStyles='text-white', subTitleStyles='text-neutral-500', }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} `}>
      <div className={`font-bold text-4xl  ${titleStyles}`}>{title}</div>
      {subtitle && (
        <div className={`font-medium mt-2  ${subTitleStyles}`}>{subtitle}</div>
      )}
    </div>
  );
};

export default Heading1;
