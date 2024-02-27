import React from "react";
import useFetch from "../../../customHooks/useFetch";
import FeedSuggestionOptionList from "./FeedSuggestionOptionList";
import FeedSuggestionSkeleton from "./FeedSuggestionSkeleton/FeedSuggestionSkeleton";

const FeedSuggestionOptionContainer = () => {
  const { data: suggestedUsers, isLoading, error } = useFetch("http://localhost:8080/api/users/suggestion", []);

  if (isLoading) {
    return <FeedSuggestionSkeleton />;
  }

  return(
    <>
      {error && <h2 className="text-red text-2xl">ERROR</h2>}
      {suggestedUsers && <FeedSuggestionOptionList suggestedUsers={suggestedUsers} />}
    </>
  )
};

export default FeedSuggestionOptionContainer;
