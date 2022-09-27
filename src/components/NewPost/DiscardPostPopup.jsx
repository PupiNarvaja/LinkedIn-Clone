import React from "react";

const DiscardPostPopup = ({ closeDiscardPopup }) => {
  return (
    <div className="w-full h-[100vh] top-0 left-0 absolute z-20">
      <div className="max-w-[336px] mx-auto relative top-40 bg-white rounded-lg z-30">
        <div className="px-6 py-4 flex justify-between items-center border-b-[0.1px] border-b-gray-200">
          <h2 className="text-xl text-linkedin-black">Save this post as a draft?</h2>
          <button
            type="button"
            onClick={() => closeDiscardPopup()}
            className="absolute right-5 my-auto p-2 rounded-full hover:bg-[#00000014] duration-150"
          >
            <svg
              className="text-[#00000099]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
            </svg>
          </button>
        </div>
        <div className="px-6 py-3 flex justify-end">
          <button
            className="px-4 py-1 my-1 rounded-full font-semibold text-white bg-linkedin-blue hover:bg-linkedin-darkblue disabled:cursor-not-allowed disabled:text-[#0000004D] disabled:bg-[#00000014] duration-150"
            onClick={() => console.log("closed")}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscardPostPopup;
