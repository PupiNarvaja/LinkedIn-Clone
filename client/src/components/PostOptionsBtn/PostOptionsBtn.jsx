import React, { useState } from 'react';
import useDeleteRequest from '../../customHooks/useDeleteRequest';

const PostOptionsBtn = ({ postId }) => {
const [isOpen, setIsOpen] = useState(false);

  const handleOpenOptions = () => {
    setIsOpen(!isOpen);
  }

  const deletePost = async () => {
    await useDeleteRequest(`http://localhost:8080/api/posts/delete/${postId}`);
  }

  return (
    <>
      <button onClick={handleOpenOptions}>
        ...
      </button>
      {isOpen &&
        <div className="p-3 relative flex flex-col gap-2 top-2 border rounded-xl border-linkedin-red bg-white">
          <div className="relative">
            <button
              className="py-2 px-3 text-linkedin-red border rounded-xl border-linkedin-red bg-white"
              onClick={deletePost}
            >
              Delete post  
            </button>
            <button
              className="py-2 px-3 border rounded-xl border-black bg-white"
              onClick={() => alert("Post reported!")}
            >
              Report post  
            </button>
          </div>
        </div>}
    </>
  )
}

export default PostOptionsBtn