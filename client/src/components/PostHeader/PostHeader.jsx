import React from "react";
import PostOptionsBtn from "../PostOptionsBtn/PostOptionsBtn";
import { dateFormater } from "../../utils/dateFormater";

const PostHeader = ({ postId, profile, author, description, timestamp }) => {
  return (
    <header className="w-full mb-2 flex justify-between items-center">
      <div className="flex">
        <img
          src={profile}
          alt={author}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <h2 className="text-sm font-semibold">{author}</h2>
          <p className="text-xs text-linkedin-gray">{description}</p>
          <span className="text-xs text-linkedin-gray">
            {dateFormater(timestamp)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <PostOptionsBtn postId={postId} />
        <button className="h-8 px-2 pb-1 text-blue-500 font-semibold rounded hover:bg-blue-100 duration-150">
          <strong className="text-xl">+</strong>
          Follow
        </button>
      </div>
    </header>
  );
};

export default PostHeader;


// Eliminar post -> Boton de front junto a delete req
// Eliminar post -> Implica eliminar todos sus comentarios.
// Considerar _> user con array de posts likeados.
// Eliminar comentario -> Implica eliminarlo de su post.
// TODO esto solo si el user actual == author.

// Opcional -> Opcion de reportar si user != author. Que me llegue un mail o algo.
// Si ya lo sigo o si soy yo, no aparecer boton de follow.