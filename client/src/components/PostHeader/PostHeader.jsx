import React from "react";
import { dateFormater } from "../../utils/dateFormater";

const PostHeader = ({ profile, author, description, timestamp }) => {
  return (
    <header className="w-full mb-2 flex justify-between items-center">
      <div className="flex">
        <img
          src={profile}
          alt={author}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <h2 className="text-sm font-semibold">{author}</h2>
          <p className="text-xs text-linkedin-gray">{description}</p>
          <span className="text-xs text-linkedin-gray">
            {dateFormater(timestamp)}
          </span>
        </div>
      </div>
      <button className="h-8 px-2 pb-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150">
        <strong className="text-xl">+</strong>
        Follow
      </button>
    </header>
  );
};

export default PostHeader;
