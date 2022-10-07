import React from "react";

const FeedError = ({ error }) => {
  if (error) {
    return (
      <div className="w-full p-10 bg-white border border-red-500 rounded-lg">
        {error.message}
      </div>
    );
  }
};

export default FeedError;
