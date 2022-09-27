import { useEffect, useState } from 'react';
import axios from 'axios';

import ButtonNewPostOption from './ButtonNewPostOption';
import Post from './Post';
import avatar from '../assets/avatar.png';
import PostPopup from './PostPopup';
import DiscardPostPopup from './NewPost/DiscardPostPopup';
import Loader from '../utils/loader/Loader';
import { hasOnlySpaces } from "../utils/postValidation"; // Crear index para importacion de utils. Y usar custom hook y react query.

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [discardPopupOpen, setDiscardPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/posts");
        setPosts(data.reverse());
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const closePostPopup = (post) => {
    if (!hasOnlySpaces(post)) {
      return setDiscardPopupOpen(true);
    }
    setPopupOpen(false);
  };

  return (
    <main className="mx-5 flex-[0.6]">
      {discardPopupOpen && <DiscardPostPopup closeDiscardPopup={setDiscardPopupOpen} />}
      {popupOpen && (
        <>
          {/* it changes dark background depending on which popup is shown: If discard popup is rendered, dark background will also cover post popup. */}
          <div className={`w-full h-[100vh] top-0 left-0 fixed bg-[#000000BF] ${(popupOpen && discardPopupOpen) ? "z-10" : "z-1"}`} />
          <PostPopup
            avatar={avatar}
            name="Juan Manuel Narvaja"
            closePostPopup={closePostPopup}
            openPopup={setPopupOpen}
            posts={posts}
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

      {isLoading ? (
        <div className="flex justify-center mt-8">
          <Loader />
        </div>
      ) : (
        posts.map(({
            _id,
            photoUrl,
            author,
            description,
            message,
            comments,
            timestamp,
          }) => (
            <Post
              key={_id}
              photoUrl={photoUrl}
              author={author}
              description={description}
              message={message}
              comments={comments}
              timestamp={timestamp}
            />)))}
    </main>
  );
};

export default Feed;
