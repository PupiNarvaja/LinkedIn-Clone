import { useState } from "react";
import { hasOnlySpaces, characterLimitReached } from "../../utils/postValidation";
import Loader from "../../utils/loader/Loader";
import axios from "axios";

const PostPopup = ({ avatar, name, openPopup, closePostPopup, posts }) => {
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 750);

  const sendPost = async () => {
    try {
      await axios.post("http://localhost:8080/api/posts", {
        author: "Juancho",
        description: "React Full-Stack developer", // Change to dinamic.
        message: post.trim(),
        photoUrl: "LinkToPhoto",
        timestamp: Date.now(),
      });
      // --------------------------> Con redux pushear a posts.
      openPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] top-0 left-0 fixed">
      <div className="max-w-[552px] mx-auto relative top-9 bg-white rounded-lg z-10">
        <div className="px-6 py-4 flex justify-between items-center border-b-[0.1px] border-b-gray-200">
          <h2 className="text-xl text-linkedin-black">Create a post</h2>
          <button
            type="button"
            onClick={() => closePostPopup(post)}
            className="absolute right-5 my-auto p-2 rounded-full hover:bg-[#00000014] duration-150"
          >
            <svg
              className="text-[#00000099]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
            </svg>
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-40">
            <Loader />
          </div>
        ) : (
          <>
            <div className="px-6 py-3 flex items-end">
              <img src={avatar} alt="" className="w-12 h-12 rounded-full" />
              <div className="ml-2 flex flex-col">
                <span className="font-semibold">{name}</span>
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
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
            </div>
            {characterLimitReached(post) ? (
              <div className="pt-3 pr-6 pb-1 pl-4 flex justify-between items-center text-sm text-linkedin-red">
                <span className="flex items-center">
                  <img
                    src="https://img.icons8.com/flat-round/14/000000/no-entry--v1.png"
                    className="mr-1"
                  />
                  You have exceeded the maximum character limit
                </span>
                <span className="ml-8 py-[5px] font-semibold">-{post.length - 3000}</span>
              </div>
            ) : (
              <div className="pt-3 pr-6 pb-1 pl-4 flex justify-start">
                <button className="px-2 py-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150">
                  Add hashtag
                </button>
              </div>
            )}

            <div className="px-6 py-3 flex justify-end">
              <button
                className="px-4 py-1 my-1 rounded-full font-semibold text-white bg-linkedin-blue hover:bg-linkedin-darkblue disabled:cursor-not-allowed disabled:text-[#0000004D] disabled:bg-[#00000014] duration-150"
                disabled={hasOnlySpaces(post) || characterLimitReached(post)}
                onClick={() => sendPost()}
              >
                Post
              </button>
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
