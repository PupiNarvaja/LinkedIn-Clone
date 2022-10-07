import React from "react";
import avatar from '../assets/avatar.png';
import banner from '../assets/banner.png';

const SideBar = () => {

  const recentItems = (topic) => (
    <li className="duration-150 hover:bg-neutral-200">
      <a href="#" className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black">
        <span className="mr-2">#</span>
        <p>{topic}</p>
      </a>
    </li>
  );

  return (
    <aside className="min-w-[180px] h-auto flex-[0.2] rounded-xl text-center">
      <div className="pb-[10px] flex flex-col items-center border border-b-0 border-gray-300 bg-white rounded-t-xl">
        <img
          src={banner}
          alt=""
          className="w-full h-[60px] mb-[-20px] rounded-t-xl object-cover"
        />
        <img
          src={avatar}
          alt=""
          className=" w-10 h-10 mb-2 rounded-full"
        />
        <h2 className="text-md">Juan Manuel Narvaja</h2>
        <h4 className="text-gray-400 text-xs">juanmanarvaja@gmail.com</h4>
      </div>

      <div className="p-[10px] mb-[10px] border border-gray-300 bg-white rounded-b-xl">
        <div className="mt-[10px] flex justify-between">
          <p className="text-gray-400 text-xs font-semibold">Contacts</p>
          <p className="text-xs text-[#0a66c2] font-bold">51</p>
        </div>
        <div className="mt-[10px] flex justify-between">
          <p className="text-gray-400 text-xs font-semibold">Views on your profile</p>
          <p className="text-xs text-[#0a66c2] font-bold">63</p>
        </div>
      </div>

      <div className="py-[10px] mt-[10px] sticky top-[76px] text-left bg-white border border-gray-300 rounded-[10px]">
        <p className="pl-3 text-xs">Recent</p>
        <ul>
          {recentItems("reactjs")}
          {recentItems("programming")}
          {recentItems("softwareengineering")}
          {recentItems("design")}
          {recentItems("developer")}
        </ul>
      </div>
    </aside>
  )
};

export default SideBar;


// 1128
// 960
// 720
// 576