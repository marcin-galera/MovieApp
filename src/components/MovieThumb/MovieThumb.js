import React from "react";
import "./MovieThumb.css";

const MovieThumb = props => {
  return (
    <div class="moviethumbFlex">
      <div class="">
        <img src={props.image} alt="movieThumb" />
      </div>
    </div>
  );
};

export default MovieThumb;
