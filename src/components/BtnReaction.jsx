import React from 'react';

const BtnReaction = ({ icon, title }) => {
  return (
    <button type="button" className="px-4 py-3 flex items-center rounded cursor-pointer duration-150 hover:bg-neutral-200">
      <img src={icon} className="w-6 h-6 object-fit" />
      <h4 className="ml-1 text-sm text-gray-500 font-semibold">{title}</h4>
    </button>
  )
};

export default BtnReaction;