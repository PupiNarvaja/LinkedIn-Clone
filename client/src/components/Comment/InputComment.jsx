import React from 'react'

const handleResize = (event) => {
  if (event.target.scrollHeight <= 62) {
    event.target.style.height = '40px';
  } else {
    event.target.style.height = 'auto';
    event.target.style.height = (event.target.scrollHeight) + 'px';
  }
};

const InputComment = ({ profile, author, value, onChange }) => {
  return (
    <div className="w-full my-2 flex justify-between items-start">
      <img
        src={profile}
        alt={author}
        className="w-10 h-10 object-cover rounded-full shrink-0"
      />
      <textarea
        //name=""
        //id=""
        placeholder="Add a comment..."
        className="w-full h-[40px] p-2 pl-4 ml-2 flex bg-white rounded-[20px] border border-gray-400 outline-none resize-none overflow-y-hidden"
        value={value}
        onChange={onChange}
        onInput={handleResize}
      ></textarea>
    </div>
  )
}

export default InputComment