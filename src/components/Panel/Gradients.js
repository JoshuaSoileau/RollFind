import React from "react";
import { classnames, fadeBlipClassName } from "../../utils";

const Gradients = ({ isOpen }) => {
  const boxClass = classnames("rounded-t-3xl md:rounded-3xl");
  const closeBox = classnames(
    boxClass,
    "overflow-hidden",
    "pointer-events-none",
    "fixed md:absolute inset-0 md:inset-y-12 top-56 md:top-12 md:right-12",
    "flex flex-col justify-between",
    !isOpen && "md:translate-x-1/2",
    fadeBlipClassName(isOpen)
  );
  return (
    <div className={closeBox}>
      <div className="h-12 md:h-16 inset-x-0 bg-gradient-to-b from-gray-800 z-10"></div>
      <div className="h-28 inset-x-0 bg-gradient-to-t from-gray-800 z-10"></div>
    </div>
  );
};

export default Gradients;
