import Comment from "../Comments/Comment";

const CommentsList = ({ comments, postAuthorId }) => (
  comments.map(({ _id, author, content, timestamp, postId }) => (
    <Comment
      key={_id}
      commentId={_id}
      author={author}
      content={content}
      timestamp={timestamp}
      postId={postId}
      postAuthorId={postAuthorId}
    />
  ))
);

export default CommentsList;
