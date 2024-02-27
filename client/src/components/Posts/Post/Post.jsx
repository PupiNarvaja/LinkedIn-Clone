import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import usePostRequest from "../../../customHooks/usePostRequest";
import CommentsList from "../../Comments/CommentsList";
import NewComment from "../../Comments/NewComment";
import PostButtonReaction from "../PostButtonReaction";
import PostHeader from '../PostHeader/PostHeader';
import LikesCounter from "../LikesCounter/LikesCounter";
import useDeleteRequest from "../../../customHooks/useDeleteRequest";

const Post = ({ postId, author, content, comments, likes, timestamp }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [liked, setLiked] = useState(false);
  const user = useSelector((state) => state.user.user);
  
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
        author={author}
        timestamp={timestamp}
      />
      <p className="text-sm break-words whitespace-pre-line">{content}</p>
      <div className="flex justify-around">
        <PostButtonReaction
          title={"Like"}
          icon={liked ? "https://img.icons8.com/pastel-glyph/24/0A66C2/thumb-up--v2.png" : "https://img.icons8.com/pastel-glyph/24/737373/thumb-up--v2.png"}
          onClick={liked ? UnlikeAPost : likeAPost}
        />
        <PostButtonReaction
          title="Comment"
          icon="https://img.icons8.com/material-outlined/24/737373/comments--v1.png"
          onClick={handleOpenComment}
        />
        <PostButtonReaction
          title="Share"
          icon="https://img.icons8.com/windows/24/737373/forward-arrow.png"
          onClick={() => alert("Feature not implemented yet")}
        />
        <PostButtonReaction
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
        <NewComment
          postId={postId}
          setIsCommentOpen={setIsCommentOpen}
        />
      }

      <CommentsList comments={comments} postAuthorId={author._id} />
    </div>
  );
};

export default Post;
