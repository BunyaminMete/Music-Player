import React from "react";

import "./favori.css";
import { Favorite } from "../../context/store";

const heartButton = "https://cdn-icons-png.flaticon.com/128/2001/2001166.png";
const afterHeart = "https://cdn-icons-png.flaticon.com/128/3892/3892676.png";

const FavoriteButton = () => {
  console.log(Favorite.isFavorite);
  return (
    <>
      <button
        onClick={() => {
          Favorite.isFavorite += 1;
        }}
        className="favoriteButton"
      >
        {Favorite.isFavorite % 2 === 0 ? (
          <img className="favoriteImage" src={heartButton} alt="afterfav"></img>
        ) : (
          <img
            className="favoriteImage"
            alt="favoritebutton"
            src={afterHeart}
          ></img>
        )}
      </button>
    </>
  );
};

export default FavoriteButton;
