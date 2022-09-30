import { useState } from "react";
import ButtonNewPostOption from "./ButtonNewPostOption";
import avatar from "../../assets/avatar.png";
import PostPopup from "./PostPopup";
import DiscardPostPopup from "./DiscardPostPopup";
import { hasOnlySpaces } from "../../utils/postValidation";

const NewPost = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [discardPopupOpen, setDiscardPopupOpen] = useState(false);

  const closePostPopup = (post) =>
    hasOnlySpaces(post) ? setPopupOpen(false) : setDiscardPopupOpen(true);

  const onDiscard = () => {
    setDiscardPopupOpen(false);
    setPopupOpen(false);
  };

  return (
    <>
      {discardPopupOpen && (
        <DiscardPostPopup
          closeDiscardPopup={setDiscardPopupOpen}
          onDiscard={onDiscard}
        />
      )}
      {popupOpen && (
        <>
          {/* it changes dark background depending on which popup is shown: If discard popup is rendered, dark background will also cover post popup. */}
          <div
            className={`w-full h-[100vh] top-0 left-0 fixed bg-[#000000BF] ${
              popupOpen && discardPopupOpen ? "z-10" : "z-1"
            }`}
          />
          <PostPopup
            avatar={avatar}
            name="Juan Manuel Narvaja"
            closePostPopup={closePostPopup}
            openPopup={setPopupOpen}
          />
        </>
      )}
      <div className="px-4 pt-[8px] pb-0 rounded-xl border border-gray-300 bg-white">
        <div className="flex items-center ">
          <img
            src={avatar}
            alt=""
            className="w-12 h-12 mr-2 object-contain rounded-full"
          />
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="w-full p-3 pl-4 flex bg-white rounded-[35px] border border-gray-400 duration-150 hover:bg-neutral-200"
          >
            <span className="text-sm text-gray-400">Start a post</span>
          </button>
        </div>
        <div className="my-1 flex justify-around">
          <ButtonNewPostOption
            title="Photo"
            icon="https://img.icons8.com/sf-regular/24/228BE6/image.png"
          />
          <ButtonNewPostOption
            title="Video"
            icon="https://img.icons8.com/fluency-systems-filled/24/40C057/video-clip.png"
          />
          <ButtonNewPostOption
            title="Event"
            icon="https://img.icons8.com/metro/24/FAB005/calendar-5.png"
          />
          <ButtonNewPostOption
            title="Write article"
            icon="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/24/FA5252/external-news-trading-jumpicon-glyph-jumpicon-glyph-ayub-irawan.png"
          />
        </div>
      </div>
    </>
  );
};

export default NewPost;
