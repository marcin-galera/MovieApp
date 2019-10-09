import React from "react";
import "./HomeLayer.css";

const HomeLayer = props => {
  const renderElements = () => {
    const gridElements = props.children.map((element, i) => {
      return (
        <div key={i} className="column">
          {element}
        </div>
      );
    });
    return gridElements;
  };
  return (
    <div className="gridContainer">
      {props.header && !props.loading ? (
        <h1 className="titleContainer">{props.header}</h1>
      ) : null}
      <div className="ui three column centered grid">{renderElements()}</div>
    </div>
  );
};

export default HomeLayer;
