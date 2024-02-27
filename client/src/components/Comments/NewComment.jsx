import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Loader from "../Loader/Loader";
import PostButton from "../Buttons/PostButton";
import usePostRequest from "../../customHooks/usePostRequest";
import { addComment } from '../../redux/features/postsSlice';
import { characterLimitReached, invalidContentDisablesButton } from "../../utils/postValidation";
import LimitCharacterSpan from "../LimitCharacterSpan/LimitCharacterSpan";

const NewComment = ({ postId, setIsCommentOpen }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const user =  useSelector((state) => state.user.user);
  const characterLimit = 1250;
  
  const postComment = async () => {
    try {
      const newComment = {
        postId: postId,
        content: comment,
      }

      setIsLoading(true);
      
      const { data: updatedComment } = await usePostRequest("http://localhost:8080/api/comments", newComment);
      
      dispatch(addComment({ postId, updatedComment }));
      
      setIsLoading(false);
      setComment("");
      setIsCommentOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleOnChange = (e) => {
    setComment(e.target.value);
  }
  
  const handleResize = (e) => {
    if (e.target.scrollHeight <= 62) {
      e.target.style.height = '40px';
    } else {
      e.target.style.height = 'auto';
      e.target.style.height = (e.target.scrollHeight) + 'px';
    }
  };

  return (
    <>
      <div className="w-full my-2 flex justify-between items-start">
        <img
          src={user.profile}
          alt={`${user.firstname} ${user.lastname}`}
          className="w-10 h-10 object-cover rounded-full shrink-0"
          />
        <textarea
          name="comment"
          id="comment"
          placeholder="Add a comment..."
          className="w-full h-[40px] p-2 pl-4 ml-2 flex bg-white rounded-[20px] border border-gray-400 outline-none resize-none overflow-y-hidden"
          value={comment}
          onChange={handleOnChange}
          onInput={handleResize}
        ></textarea>
      </div>

      { characterLimitReached(comment, characterLimit) &&
        <div className="mt-3 mb-2 flex justify-between items-center text-sm text-linkedin-red">
          <LimitCharacterSpan 
            length={comment.length}
            characterLimit={characterLimit}
          />
        </div>
      }

      { comment != "" &&
        <PostButton
          text={"Post"}
          isDisabled={invalidContentDisablesButton(comment, characterLimit) || isLoading}
          onClick={postComment}
        />
      }

      { isLoading && <Loader />}
    </>
  )
}

export default NewComment

// Tocar el PostButtonReaction borra el comment, mostrar popup de estas seguro?