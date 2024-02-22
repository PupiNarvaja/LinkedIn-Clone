import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { characterLimitReached, invalidContentDisablesButton } from "../../utils/postValidation";
import usePostRequest from "../../customHooks/usePostRequest";
import CommentsList from "../Comment/CommentsList";
import InputComment from "../Comment/InputComment";
import BtnReaction from "./BtnReaction";
import PostButton from "../Buttons/PostButton";
import PostHeader from '../PostHeader/PostHeader';
import LimitCharacterSpan from "../LimitCharacterSpan/LimitCharacterSpan";
import Loader from "../../utils/loader/Loader";
import LikesCounter from "../LikesCounter/LikesCounter";
import useDeleteRequest from "../../customHooks/useDeleteRequest";

const Post = ({ postId, profile, author, description, content, comments, likes, timestamp }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(likes.length);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const characterLimit = 1250;
  const user = useSelector((state) => state.userReducer.user);

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
  
  const likeAPost = async () => {
    setLiked(true);
    setLikeCount(likeCount + 1);
    await usePostRequest("http://localhost:8080/api/posts/like", { postId });
  }

  const UnlikeAPost = async () => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    await useDeleteRequest("http://localhost:8080/api/posts/like", { postId });
  }

  const handleOpenComment = () => {
    setIsCommentOpen(!isCommentOpen);
  }

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  useEffect(() => {
    if (likes && user) {
      setLiked(likes.some(like => like._id === user._id));
      setLikeCount(likes.length);
    }
  }, [likes, user])

  return (
    <div className="w-full mb-2 px-4 py-3 pb-1 linkedin-border">
      <PostHeader
        postId={postId}
        profile={profile}
        author={author}
        description={description}
        timestamp={timestamp}
      />
      <p className="text-sm break-words whitespace-pre-line">{content}</p>
      <div className="flex justify-around">
        <BtnReaction
          title={"Like"}
          icon={liked ? "https://img.icons8.com/pastel-glyph/24/0A66C2/thumb-up--v2.png" : "https://img.icons8.com/pastel-glyph/24/737373/thumb-up--v2.png"}
          onClick={liked ? UnlikeAPost : likeAPost}
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

      { likeCount !== 0  &&
        <LikesCounter
          likes={likeCount}
        />
      }

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

export default Post;
