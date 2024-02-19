import React from "react";
import likeIcon from "../../assets/like.png"

const LikesCounter = ({ likes }) => {
  return (
    <div className="flex items-center">
      <img src={likeIcon} className="w-3 h-3 mr-1" />
      <span className="text-xs text-linkedin-gray">{likes > 5 ? `(followed person) and  ${likes - 1} others.` : likes}</span>
    </div>
  )
};

export default LikesCounter;
