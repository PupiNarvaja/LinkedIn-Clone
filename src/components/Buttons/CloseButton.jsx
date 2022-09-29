import React from "react";

const CloseButton = ({ size, onClickFunction, ...classes }) => {
  return (
    <button
      type="button"
      onClick={() => onClickFunction()}
      className={`absolute my-auto rounded-full hover:bg-[#00000014] duration-150 ${classes.classes}`}
    >
      <svg
        className="text-[#00000099]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        data-supported-dps="24x24"
        fill="currentColor"
        width={size}
        height={size}
        focusable="false"
      >
        <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
      </svg>
    </button>
  );
};

export default CloseButton;


//hacer button blue y follow
