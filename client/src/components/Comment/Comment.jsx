import React, { useState } from 'react';
import useDeleteRequest from '../../customHooks/useDeleteRequest';
import { dateFormater } from "../../utils/dateFormater";

const Comment = ({ commentId, author, content, timestamp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  }

  const deleteComment = async () => {
    await useDeleteRequest(`http://localhost:8080/api/comments/delete/${commentId}`);
  }

  return (
    <div className="w-full my-2 flex justify-between items-start gap-1">
      <img
        src={author.profile}
        alt={`${author.firstname} ${author.lastname}`}
        className="w-10 h-10 object-cover rounded-full shrink-0"
      />
      <div className="w-full p-3 pr-4 bg-linkedin-lightgray rounded-[6px] rounded-tl-[0rem]">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-sm font-semibold">{`${author.firstname} ${author.lastname}`}</h4>
            <h5 className="text-xs text-linkedin-gray">{author.description}</h5>
          </div>
          <span className="text-xs text-linkedin-gray">
            {dateFormater(timestamp)}
          </span>
          <div>
            <button onClick={handleOpenOptions}>
              ...
            </button>
            {isOpen &&
              <div className="p-3 relative flex flex-col gap-2 top-2 border rounded-xl border-linkedin-red bg-white">
                <div className="relative">
                  <button
                    className="py-2 px-3 text-linkedin-red border rounded-xl border-linkedin-red bg-white"
                    onClick={deleteComment}
                  >
                    Delete Comment 
                  </button>
                </div>
              </div>}
          </div>
        </div>
        <p className="text-sm break-words whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
