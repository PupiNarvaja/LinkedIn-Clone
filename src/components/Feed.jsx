import { useEffect, useState } from 'react';

import ButtonNewPostOption from './ButtonNewPostOption';
import Post from './Post';
import avatar from '../assets/avatar.png';
import { db } from "../firebase";
import { query, collection, getDocs, orderBy, limit } from 'firebase/firestore/lite';
import PostPopup from './PostPopup';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const data = collection(db, "posts")
      const request = query(data, orderBy("timestamp", "desc"), limit(1000));
      const dataSnapshot = await getDocs(request)
      setPosts(dataSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })))
    })()
  }, []);

  const openPopup = () => {
    setPopupOpen(false)
  }

  return (
    <main className="mx-5 flex-[0.6]">
      {
      popupOpen ?
      <PostPopup avatar={avatar} name="Juan Manuel Narvaja" openPopup={openPopup} posts={posts} />
        :
      ""
    }
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
          <ButtonNewPostOption title="Photo" icon="https://img.icons8.com/sf-regular/24/228BE6/image.png" />
          <ButtonNewPostOption title="Video" icon="https://img.icons8.com/fluency-systems-filled/24/40C057/video-clip.png" />
          <ButtonNewPostOption title="Event" icon="https://img.icons8.com/metro/24/FAB005/calendar-5.png" />
          <ButtonNewPostOption title="Write article" icon="https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/24/FA5252/external-news-trading-jumpicon-glyph-jumpicon-glyph-ayub-irawan.png" />
        </div>
      </div>

      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </main>
  )
};

export default Feed;
