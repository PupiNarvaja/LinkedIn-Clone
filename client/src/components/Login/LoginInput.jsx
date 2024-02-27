import React from "react";

const LoginInput = ({ type, name, id, value, onChange, onFocus, onBlur }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      required
      className="w-full pt-5 px-3 pb-1 outline-none rounded-[2px] border border-black focus:border-[#0073b1] focus:shadow-input-shadow"
    />
  );
};

export default LoginInput;
