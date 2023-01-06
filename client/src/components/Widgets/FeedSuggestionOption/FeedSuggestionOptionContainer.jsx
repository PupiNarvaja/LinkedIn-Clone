import React from "react";
import useFetch from "../../../customHooks/useFetch";
import Conditional from "../../../utils/Conditional";
import Loader from "../../../utils/loader/Loader";
import FeedSuggestionOptionList from "./FeedSuggestionOptionList";

const FeedSuggestionOptionContainer = () => {
  const { data: suggestedUsers, isLoading, error } = useFetch("http://localhost:8080/api/users/suggestion", []);

  return (
    <Conditional props={[
      isLoading, <Loader classes="mt-8" />,
      error, <h2 className="text-red text-2xl">ERROR</h2>,
      suggestedUsers, <FeedSuggestionOptionList suggestedUsers={suggestedUsers} />]}
    />
  );
};

export default FeedSuggestionOptionContainer;

// Loader correcto visualmente. Corregir al que sea adecuado.