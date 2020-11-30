import React from "react";
import AttributeTile from "./AttributeTile";

const Tiles = ({ attributes, item, size }) => {
  return (
    <div className="flex flex-wrap mt-8">
      {attributes?.map((attr, index) => (
        <AttributeTile
          item={item}
          key={attr}
          name={attr}
          index={index}
          size={size}
        />
      ))}
    </div>
  );
};

export default Tiles;
