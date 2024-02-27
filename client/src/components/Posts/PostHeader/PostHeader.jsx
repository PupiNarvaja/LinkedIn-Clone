import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateFormater } from "../../../utils/dateFormater";
import useDeleteRequest from "../../../customHooks/useDeleteRequest";
import OptionButtonContainer from "../../Buttons/OptionButton/OptionButtonContainer";
import OptionsButton from "../../Buttons/OptionButton/OptionsButton";
import { deletePost } from "../../../redux/features/postsSlice";

const PostHeader = ({ postId, author, timestamp }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); //Considerar un useEffect. Tira undefined al cargar a veces.
  const isUserAuthor = user._id === author._id;

  const handleDeletePost = async () => {
    await useDeleteRequest(`http://localhost:8080/api/posts/delete/${postId}`);
    dispatch(deletePost(postId));
  };

  return (
    <header className="w-full mb-2 flex justify-between items-center">
      <div className="flex">
        <img
          src={author.profile}
          alt={`${author.firstname} ${author.lastname}`}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <h2 className="text-sm font-semibold">{`${author.firstname} ${author.lastname}`}</h2>
          <p className="text-xs text-linkedin-gray">{author.description}</p>
          <span className="text-xs text-linkedin-gray">
            {dateFormater(timestamp)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        
        <OptionButtonContainer>
          {isUserAuthor &&
            <OptionsButton
              icon="https://img.icons8.com/fluency-systems-filled/22/delete.png"
              text="Delete post"
              onClick={handleDeletePost}
            />
          }
          <OptionsButton
            icon="https://img.icons8.com/external-basicons-solid-edtgraphics/22/external-flag-flags-basicons-solid-edtgraphics.png"
            text="Report post"
            onClick={() => alert("MISSING FEATURE: report post.")}
          />
        </OptionButtonContainer>

        <button className="h-8 px-2 pb-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150">
          <strong className="text-xl">+</strong>
          Follow
        </button>
      </div>
    </header>
  );
};

export default PostHeader;


// Opcional -> Opcion de reportar si user != author. Que me llegue un mail o algo.
// Si ya lo sigo o si soy yo, no aparecer boton de follow.