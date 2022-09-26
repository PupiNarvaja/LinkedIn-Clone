import BtnReaction from "./BtnReaction";
import React from "react";
import avatar from "../assets/avatar.png";

const Post = ({ photoUrl, author, description, message, comments, timestamp }) => {
  return (
    <div className="w-full mb-2 px-4 py-3 pb-1 linkedin-border">
      <header className="w-full mb-2 flex justify-between items-center">
        <div className="flex">
          <img
            src={avatar}
            alt=""
            className="w-12 h-12 object-fit rounded-full"
          />
          <div className="ml-2 flex flex-col">
            <h2 className="text-sm font-semibold">{author}</h2>
            <p className="text-xs text-linkedin-gray">{description}</p>
            <span className="text-xs text-linkedin-gray">{timestamp}</span>
          </div>
        </div>
        <button className="h-8 px-2 pb-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150"><strong className="text-xl">+</strong> Follow</button>
      </header>
      <p className="text-sm break-words whitespace-pre-line">{message}</p>
      <div className="flex justify-around">
        <BtnReaction title="Like" icon="https://img.icons8.com/pastel-glyph/24/737373/thumb-up--v2.png" />
        <BtnReaction title="Comment" icon="https://img.icons8.com/material-outlined/24/737373/comments--v1.png" />
        <BtnReaction title="Share" icon="https://img.icons8.com/windows/24/737373/forward-arrow.png" />
        <BtnReaction title="Send" icon="https://img.icons8.com/material-sharp/24/737373/filled-sent.png" />
      </div>
    </div>
  )
};

export default Post;
