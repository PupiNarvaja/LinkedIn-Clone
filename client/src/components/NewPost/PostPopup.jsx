import { useState } from "react";
import { characterLimitReached, invalidContentDisablesButton } from "../../utils/postValidation";
import { useSelector } from "react-redux";
import Loader from "../../utils/loader/Loader";
import CloseButton from "../Buttons/CloseButton";
import PostButton from "../Buttons/PostButton";
import LimitCharacterSpan from "../LimitCharacterSpan/LimitCharacterSpan";
import usePostRequest from "../../customHooks/usePostRequest";

const PostPopup = ({ openPopup, closePostPopup }) => {
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.userReducer.user);
  const characterLimit = 3000;
  
  const sendPost = async () => {
    await usePostRequest("http://localhost:8080/api/posts", { content: post.trim() });

    openPopup(false);
    //   // --------------------------> Con redux pushear a posts.
  };
  
  const handleClosePopup = () => closePostPopup(post);

  const handleSetPost = (e) => setPost(e.target.value);

  setTimeout(() => setIsLoading(false), 750);
  
  return (
    <div className="w-[100vw] h-[100vh] top-0 left-0 fixed">
      <div className="max-w-[552px] mx-auto relative top-9 bg-white rounded-lg z-10">
        <div className="px-6 py-4 flex justify-between items-center border-b-[0.1px] border-b-gray-200">
          <h2 className="text-xl text-linkedin-black">Create a post</h2>
          <CloseButton size="24" onClose={handleClosePopup} classes="p-2 right-5" />
        </div>
        {isLoading ? (
          <div className="flex justify-center py-40">
            <Loader />
          </div>
        ) : (
          <>
            <div className="px-6 py-3 flex items-end">
              <img src={user?.profile} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div className="ml-2 flex flex-col">
                <span className="font-semibold">{`${user?.firstname} ${user?.lastname}`}</span>
                <button className="w-fit px-3 py-[5px] font-semibold border border-linkedin-gray rounded-full text-[#00000099] text-sm">
                  Anyone
                </button>
              </div>
            </div>
            <div className="px-6 py-3">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="What do you want to talk about?"
                className="w-full resize-none outline-none"
                value={post}
                onChange={handleSetPost}
              ></textarea>
            </div>
            {characterLimitReached(post, characterLimit) ? (
              <div className="pt-3 pr-6 pb-1 pl-4 flex justify-between items-center text-sm text-linkedin-red">
                <LimitCharacterSpan 
                  length={post.length}
                  characterLimit={characterLimit}
                />
              </div>
            ) : (
              <div className="pt-3 pr-6 pb-1 pl-4 flex justify-start">
                <button className="px-2 py-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150">
                  Add hashtag
                </button>
              </div>
            )}

            <div className="px-6 py-3 flex justify-end">
              <PostButton
                text={"Post"}
                isDisabled={invalidContentDisablesButton(post, characterLimit)}
                onClick={sendPost}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPopup;

// Autogrow textarea
// Barra de más opciones debajo de boton hashtag.
// Implementar onClick en div shadow del popup para descartar el mensaje. Y mostrar advertencia.
// New posts message to refresh feed.

//DONE Publish post button sigue disabled cuando solo se escriben espacios.
//DONE Characters limit 3000. Excederlo tira error. Mostrar error en modal. Trimear todos los espacios al principio y final del message.
