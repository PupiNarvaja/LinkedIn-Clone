import { useEffect } from "react";
import useFetch from "../../customHooks/useFetch";
import Conditional from "../../utils/Conditional";
import Loader from "../../utils/loader/Loader";
import NewPost from "../NewPost/NewPost";
import FeedError from "./FeedError";
import FeedList from "./FeedList";

const Feed = () => {
  const { data: posts, isLoading, error } = useFetch("http://localhost:8080/api/posts", []);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/users")
  //     .then((res) => res.json())
  //     .then((res) => console.log(res))
  // }, [])
  // Si no hay user, que haga el fetch.
  
// Usar Grid
  return (
    <main className="mx-6 flex-[0.5]">
      <NewPost />
      <Conditional props={[
        isLoading, <Loader classes="mt-8" />,
        error, <FeedError error={error} />,
        posts, <FeedList posts={posts} />]}
      />
    </main>
  );
};

export default Feed;
