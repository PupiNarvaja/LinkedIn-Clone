import React from "react";

const FeedSuggestionOption = ({ id, profile, firstname, lastname, description }) => {
  
  return (
    <li className="my-3 flex">
      <img src={profile} alt={`${firstname} ${lastname}`} className="w-12 h-12 mr-3 rounded-full" />
      <div className="flex flex-col justify-between">
        <span className="text-sm font-semibold">{`${firstname} ${lastname}`}</span>
        <p className="mb-1 leading-5 text-xs text-linkedin-gray">{description}</p>
        <button className="w-fit px-4 py-1 font-semibold border border-linkedin-gray rounded-full text-[#00000099] duration-150 hover:shadow-grey-input-shadow hover:bg-linkedin-lightgray">
          + Follow
        </button>
      </div>
    </li>
  );
};

export default FeedSuggestionOption;
