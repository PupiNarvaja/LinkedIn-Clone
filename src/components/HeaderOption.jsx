import React from "react";

const HeaderOption = ({ avatar, icon, title, link }) => {
  return (
    <div className="w-20 flex flex-col items-center cursor-pointer">
      {icon && <img src={icon} />}
      {avatar && <div className="w-[24px] h-[24px] object-contain rounded-full"><img src={avatar} className="w-[24px] h-[24px] object-contain rounded-full" /></div>}
      <h3 className="text-xs">{title}</h3>
    </div>
  );
};

export default HeaderOption;
