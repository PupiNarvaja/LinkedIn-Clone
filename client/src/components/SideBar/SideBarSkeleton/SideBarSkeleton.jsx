import React from "react";
import "./SideBarSkeleton.css";

const SideBarSkeleton = () => {
  return (
    <aside className="min-w-[180px] h-auto flex-[0.2083] rounded-lg text-center">
      {/* Skeleton para la imagen */}
      <div className="pb-[10px] flex flex-col items-center border border-b-0 border-gray-300 bg-white rounded-t-lg">
        <div className="skeleton-image w-full h-[60px] rounded-t-lg" />
        <div className="w-[72px] h-[72px] mt-[-38px] mb-4 bg-gray-200 rounded-full border-2 border-solid border-white" />
        {/* Placeholder para el nombre del usuario */}
        <h2 className="text-md font-semibold bg-gray-200 h-5 w-24 mb-1 rounded-full" />
        {/* Placeholder para la descripción del usuario */}
        <h4 className="text-gray-400 text-xs bg-gray-200 h-3 w-32 rounded-full" />
      </div>

      {/* Placeholder para los datos */}
      <div className="px-[10px] py-3 border border-b-0 border-gray-300 bg-white">
        <div className="mt-[10px] flex justify-between">
          <p className="text-gray-400 text-xs font-semibold bg-gray-200 h-3 w-24 rounded-full" />
          <p className="text-xs text-[#0a66c2] font-bold bg-gray-200 h-5 w-4 rounded-full" />
        </div>
        <div className="mt-[10px] flex justify-between">
          <p className="text-gray-400 text-xs font-semibold bg-gray-200 h-3 w-24 rounded-full" />
          <p className="text-xs text-[#0a66c2] font-bold bg-gray-200 h-5 w-4 rounded-full" />
        </div>
      </div>

      {/* Placeholder para los elementos recientes */}
      <div className=" border border-gray-300 bg-white rounded-b-lg">
      </div>

      <div className="py-[10px] mt-[10px] sticky top-[76px] text-left linkedin-border">
        <p className="pl-3 text-xs">Recent</p>
        {/* Placeholder para los elementos recientes */}
        <ul>
          <li className="duration-150 hover:bg-neutral-200">
            <a
              href="#"
              className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black"
            >
              <span className="mr-2">#</span>
              <p className="h-3 w-24 rounded-full bg-gray-200" />
            </a>
          </li>
          <li className="duration-150 hover:bg-neutral-200">
            <a
              href="#"
              className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black"
            >
              <span className="mr-2">#</span>
              <p className="h-3 w-24 rounded-full bg-gray-200" />
            </a>
          </li>
          <li className="duration-150 hover:bg-neutral-200">
            <a
              href="#"
              className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black"
            >
              <span className="mr-2">#</span>
              <p className="h-3 w-24 rounded-full bg-gray-200" />
            </a>
          </li>
          <li className="duration-150 hover:bg-neutral-200">
            <a
              href="#"
              className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black"
            >
              <span className="mr-2">#</span>
              <p className="h-3 w-24 rounded-full bg-gray-200" />
            </a>
          </li>
          <li className="duration-150 hover:bg-neutral-200">
            <a
              href="#"
              className="py-[6px] px-3 flex text-xs text-gray-400 font-bold cursor-pointer duration-150 hover:text-black"
            >
              <span className="mr-2">#</span>
              <p className="h-3 w-24 rounded-full bg-gray-200" />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBarSkeleton;
