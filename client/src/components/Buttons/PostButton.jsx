import React from "react";

const PostButton = ({ text, onClick, isDisabled }) => {
  return (
    <button
      className="px-4 py-1 my-1 rounded-full font-semibold text-white bg-linkedin-blue hover:bg-linkedin-darkblue disabled:cursor-not-allowed disabled:text-[#0000004D] disabled:bg-[#00000014] duration-150"
      disabled={isDisabled}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default PostButton;