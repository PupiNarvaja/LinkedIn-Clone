import useFetch from "../../customHooks/useFetch";
import Conditional from "../../utils/Conditional";
import Loader from "../../utils/loader/Loader";
import NewPost from "../NewPost/NewPost";
import FeedError from "./FeedError";
import FeedList from "./FeedList";

const Feed = () => {
  const { data: posts, isLoading, error } = useFetch("http://localhost:8080/api/posts", []);
  
// Usar Grid
  return (
    <main className="mx-6 flex-[0.5]">
      <NewPost />
      <button className="w-full h-4 my-2">
        <hr className="w-full border-linkedin-lightgray"></hr>
      </button>
      <Conditional props={[
        isLoading, <div className="mt-8"><Loader /></div>,
        error, <FeedError error={error} />,
        posts, <FeedList posts={posts} />]}
      />
    </main>
  );
};

export default Feed;
