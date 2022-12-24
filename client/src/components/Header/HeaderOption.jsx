import React from "react";

const HeaderOption = ({ avatar, icon, title, link }) => {
  return (
    <div className="w-20 min-h-[40px] flex flex-col justify-end items-center cursor-pointer">
      {icon && <img src={icon} />}
      {avatar && <div className="w-[24px] h-[24px] object-contain rounded-full"><img src={avatar} className="w-[24px] h-[24px] object-contain rounded-full" /></div>}
      <h3 className="text-xs text-linkedin-gray">{title}</h3>
    </div>
  );
};

export default HeaderOption;
