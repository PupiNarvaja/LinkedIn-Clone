import React from "react";
import { dateFormater } from "../../utils/dateFormater";
import useDeleteRequest from "../../customHooks/useDeleteRequest";
import OptionsButton from "../Buttons/OptionButton/OptionsButton";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/features/postsSlice";
import OptionButtonContainer from "../Buttons/OptionButton/OptionButtonContainer";

const Comment = ({ commentId, author, content, timestamp, postId, postAuthorId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isUserCommentAuthor = user._id === author._id;
  const isUserPostAuthor = user._id === postAuthorId;

  const handleDeleteComment = async () => {
    await useDeleteRequest(`http://localhost:8080/api/comments/delete/${commentId}`);
    dispatch(deleteComment({ commentId, postId }));
  };

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

          <OptionButtonContainer>
            {(isUserCommentAuthor || isUserPostAuthor) &&
              <OptionsButton
                icon="https://img.icons8.com/fluency-systems-filled/22/delete.png"
                
                text="Delete comment"
                onClick={handleDeleteComment}
              />
            }
            <OptionsButton
              icon="https://img.icons8.com/external-basicons-solid-edtgraphics/22/external-flag-flags-basicons-solid-edtgraphics.png"
              text="Report comment"
              onClick={() => alert("MISSING FEATURE: report post.")}
            />
          </OptionButtonContainer>
          
        </div>
        <p className="text-sm break-words whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
