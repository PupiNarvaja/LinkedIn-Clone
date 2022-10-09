import React from "react";
import FeedSugestionOption from "./FeedSugestionOption";

// Faltan estilos.
const Widgets = () => {
  return (
    <div className="h-fit p-3 flex-[0.2916] linkedin-border">
      <div>
        <h2 className="font-semibold">Add to your feed</h2>
      </div>
      <ul>
        <FeedSugestionOption />
        <FeedSugestionOption />
        <FeedSugestionOption />
      </ul>
      <button>
        View all recommendations ➜
      </button>
    </div>
  );
};

export default Widgets;
