import React from 'react';

const LimitCharacterSpan = ({ length, characterLimit }) => {
  return (
    <>
      <span className="flex items-center">
        <img
          src="https://img.icons8.com/flat-round/14/000000/no-entry--v1.png"
          className="mr-1"
        />
        You have exceeded the maximum character limit
      </span>
      <span className="font-semibold">
        -{length - characterLimit}
      </span>
    </>
  )
}

export default LimitCharacterSpan;