import React from "react";
import "./HeroImage.css";

const HeroImage = props => {
  const image = props.image;
  const divStyle = {
    background: `url('${image}') no-repeat center center fixed`,
    backgroundSize: "cover"
  };

  return (
    <div className="heroContainer image" style={divStyle}>
      <div className="content">
        <div className="text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
