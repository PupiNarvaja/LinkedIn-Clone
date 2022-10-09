import React from "react";
import avatar from "../../assets/avatar.png";

const FeedSugestionOption = () => {
  return (
    <li className="my-3 flex">
      <img src={avatar} alt="" className="w-12 h-12 mr-3 rounded-full" />
      <div className="flex flex-col justify-between">
        <span className="text-sm font-semibold">Juanchoo</span>
        <p className="mb-1 leading-5 text-xs text-linkedin-gray">Company • Human Resources</p>
        <button className="w-fit px-4 py-1 font-semibold border border-linkedin-gray rounded-full text-[#00000099]">
          + Follow
        </button>
      </div>
    </li>
  );
};

export default FeedSugestionOption;
