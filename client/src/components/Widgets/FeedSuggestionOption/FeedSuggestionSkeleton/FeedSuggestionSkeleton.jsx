import React from "react";
import "./FeedSuggestionSkeleton.css";

const FeedSuggestionSkeleton = () => {
  return (
    <>
      <li className="my-3 flex">
        <div className="skeleton-profile w-12 h-12 mr-3 rounded-full bg-gray-200" />
        <div className="flex flex-col justify-between">
          <span className="skeleton-name text-sm font-semibold bg-gray-200 h-5 w-40 mb-1 rounded-full" />
          <p className="skeleton-description mb-1 leading-5 text-xs text-linkedin-gray bg-gray-200 h-3 w-48 rounded-full" />
          <button className="skeleton-button w-20 px-4 py-1 font-semibold bg-gray-200 border border-gray-200 rounded-full text-gray-200 duration-150 hover:bg-gray-300 cursor-not-allowed">
            
          </button>
        </div>
      </li>
      <li className="my-3 flex">
        <div className="skeleton-profile w-12 h-12 mr-3 rounded-full bg-gray-200" />
        <div className="flex flex-col justify-between">
          <span className="skeleton-name text-sm font-semibold bg-gray-200 h-5 w-40 mb-1 rounded-full" />
          <p className="skeleton-description mb-1 leading-5 text-xs text-linkedin-gray bg-gray-200 h-3 w-48 rounded-full" />
          <button className="skeleton-button w-20 px-4 py-1 font-semibold bg-gray-200 border border-gray-200 rounded-full text-gray-200 duration-150 hover:bg-gray-300 cursor-not-allowed">
            
          </button>
        </div>
      </li>
      <li className="my-3 flex">
        <div className="skeleton-profile w-12 h-12 mr-3 rounded-full bg-gray-200" />
        <div className="flex flex-col justify-between">
          <span className="skeleton-name text-sm font-semibold bg-gray-200 h-5 w-40 mb-1 rounded-full" />
          <p className="skeleton-description mb-1 leading-5 text-xs text-linkedin-gray bg-gray-200 h-3 w-48 rounded-full" />
          <button className="skeleton-button w-20 px-4 py-1 font-semibold bg-gray-200 border border-gray-200 rounded-full text-gray-200 duration-150 hover:bg-gray-300 cursor-not-allowed">
            
          </button>
        </div>
      </li>
    </>
  );
};

export default FeedSuggestionSkeleton;