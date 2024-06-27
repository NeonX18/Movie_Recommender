
import React from "react";

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  type="button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disbaled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full p-4
    ${
      outline
        ? "bg-white border-black text-black"
        : "bg-primary-red/90 border-primary-red/90 hover:bg-primary-red hover:border-primary-red text-white"
    }
    
    ${
      small
        ? "py-1 text-md font-light border-[1px]"
        : "py-3 text-xl font-semibold border-2"
    }
    `}
    >
      {label}
    </button>
  );
};

export default Button;
