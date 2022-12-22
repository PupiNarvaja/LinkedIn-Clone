import React from "react";

const RegisterInput = ({ label, value, type, setter }) => {
  return (
    <>
      <label className="mt-4 mb-1 text-sm text-linkedin-gray" htmlFor={label}>{label[0].toUpperCase() + label.substring(1)}</label>
      <input
        required
        type={type}
        name={label}
        id={label}
        className="px-[10px] py-[3px] rounded border border-linkedin-gray"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </>
  );
};

export default RegisterInput;
