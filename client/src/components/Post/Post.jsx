import { useState } from 'react';
import { characterLimitReached, invalidContentDisablesButton } from "../../utils/postValidation";
import { dateFormater } from "../../utils/dateFormater";
import usePostRequest from "../../customHooks/usePostRequest";
import CommentsList from "../Comment/CommentsList";
import InputComment from "../Comment/InputComment";
import BtnReaction from "./BtnReaction";
import PostButton from "../Buttons/PostButton";
import LimitCharacterSpan from "../LimitCharacterSpan/LimitCharacterSpan";
import Loader from "../../utils/loader/Loader";

const Post = ({ postId, profile, author, description, content, comments, timestamp }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const characterLimit = 1250;

  const postComment = async () => {
    try {
      const newComment = {
        postId: postId,
        content: comment,
      }

      setIsLoading(true);

      const { data: updatedComment } = await usePostRequest("http://localhost:8080/api/comments", newComment);

      comments.push(updatedComment);

      setIsLoading(false);
      setComment("");
      setIsCommentOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenComment = () => {
    setIsCommentOpen(!isCommentOpen);
  }

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  return (
    <div className="w-full mb-2 px-4 py-3 pb-1 linkedin-border">
      <header className="w-full mb-2 flex justify-between items-center">
        <div className="flex">
          <img
            src={profile}
            alt={author}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="ml-2 flex flex-col">
            <h2 className="text-sm font-semibold">{author}</h2>
            <p className="text-xs text-linkedin-gray">{description}</p>
            <span className="text-xs text-linkedin-gray">
              {dateFormater(timestamp)}
            </span>
          </div>
        </div>
        <button className="h-8 px-2 pb-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150">
          <strong className="text-xl">+</strong>
          Follow
        </button>
      </header>
      <p className="text-sm break-words whitespace-pre-line">{content}</p>
      <div className="flex justify-around">
        <BtnReaction
          title="Like"
          icon="https://img.icons8.com/pastel-glyph/24/737373/thumb-up--v2.png"
          onClick={() => alert("Feature not implemented yet")}
        />
        <BtnReaction
          title="Comment"
          icon="https://img.icons8.com/material-outlined/24/737373/comments--v1.png"
          onClick={handleOpenComment}
        />
        <BtnReaction
          title="Share"
          icon="https://img.icons8.com/windows/24/737373/forward-arrow.png"
          onClick={() => alert("Feature not implemented yet")}
        />
        <BtnReaction
          title="Send"
          icon="https://img.icons8.com/material-sharp/24/737373/filled-sent.png"
          onClick={() => alert("Feature not implemented yet")}
        />
      </div>

      { isCommentOpen &&
        <InputComment
          profile={profile}
          author={author}
          value={comment}
          onChange={handleComment}
        />
      }

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

      <CommentsList comments={comments} />
    </div>
  );
};

// Averiguar como actualizar al postear algo nuevo o comentario, que solo se actualice ese.

export default Post;
