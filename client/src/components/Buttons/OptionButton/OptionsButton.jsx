import React from "react";

const OptionsButton = ({ icon, text, onClick }) => {
  return (
    <button
      className="w-max flex items-center text-left py-2 px-3 duration-75 hover:bg-linkedin-lightgray"
      onClick={onClick}
    >
      <img
        src={icon}
        className="mr-1"
      />
      {text}
    </button>
  );
};

export default OptionsButton;
