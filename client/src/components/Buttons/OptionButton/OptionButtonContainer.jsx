import React, { useState } from "react";

const OptionButtonContainer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenOptions = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={handleOpenOptions} className="inline-block">
        ...
      </button>
      {isOpen && (
        <div className="absolute top-7 right-0 py-2 flex flex-col border rounded-xl border-linkedin-lightgray bg-white shadow-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default OptionButtonContainer;
