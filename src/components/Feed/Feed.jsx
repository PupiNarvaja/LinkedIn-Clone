import useFetch from "../../customHooks/useFetch";
import Loader from "../../utils/loader/Loader";
import NewPost from "../NewPost/NewPost";
import FeedList from "./FeedList";

const Feed = () => {
  const { data: posts, isLoading, error } = useFetch("http://localhost:8080/api/posts", []);

  return (
    <main className="mx-5 flex-[0.6]">
      <NewPost />
      {
        isLoading
        ? <Loader marginTop={8} />
        : error
        ? <div className="w-full p-10 bg-white border border-red-500 rounded-xl">{error.message}</div>
        : <FeedList posts={posts} />
      }
    </main>
  );
};

export default Feed;
