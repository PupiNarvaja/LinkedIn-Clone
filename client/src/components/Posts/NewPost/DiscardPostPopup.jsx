import React from "react";
import CloseButton from "../../Buttons/CloseButton";

const DiscardPostPopup = ({ closeDiscardPopup, onDiscard }) => {
  return (
    <div className="w-full h-[100vh] top-0 left-0 absolute z-20">
      <div className="max-w-[336px] mx-auto relative top-40 bg-white rounded-lg z-30">
        <div className="pt-6 pr-8 pb-4 pl-4 flex justify-between items-center border-b-[0.1px] border-b-gray-200">
          <h2 className="text-lg text-linkedin-black">Save this post as a draft?</h2>
          <CloseButton size="20" onClose={closeDiscardPopup} classes="p-[6px] right-1 top-1" />
        </div>
        <div className="p-4 text-linkedin-black border-b-[0.1px] border-b-gray-200">
          <p>
            The post you started will be here when you return.
          </p>
        </div>
        <div className="px-4 py-3 flex justify-end">
          <button
            className="px-4 py-1 ml-2 mt-1 rounded-full font-semibold text-linkedin-blue bg-white border border-linkedin-blue hover:bg-blue-100 hover:shadow-2 duration-150"
            onClick={onDiscard}
          >
            Discard
          </button>
          <button
            className="px-4 py-1 ml-2 mt-1 rounded-full font-semibold text-white bg-linkedin-blue hover:bg-linkedin-darkblue duration-150"
            onClick={() => alert("FEATURE MISSING: Save as a draft.")}
          >
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscardPostPopup;
