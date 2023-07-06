import React from "react";
import { Link } from "react-router-dom";

const HeaderAvatar = ({ avatar, url }) => {
  return (
    <Link to={`/in/${url}`} className="w-20 min-h-[40px] flex flex-col justify-end items-center cursor-pointer">
      {avatar && <div className="w-[24px] h-[24px] object-contain rounded-full"><img src={avatar} className="w-[24px] h-[24px] object-contain rounded-full" /></div>}
      <h3 className="text-xs text-linkedin-gray">Me</h3>
    </Link>
  );
};

export default HeaderAvatar;
