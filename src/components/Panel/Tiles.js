import React from "react";
import AttributeTile from "./AttributeTile";

const Tiles = ({ values, size }) => {
  return (
    <div className="flex flex-wrap mt-8 empty:hidden">
      {values?.map((item, index) => (
        <AttributeTile
          key={item?.title}
          title={item?.title}
          value={item?.value}
          index={index}
          size={size}
        />
      ))}
    </div>
  );
};

export default Tiles;
