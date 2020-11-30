import React from "react";
import { fadeBlipClassName } from "../../utils";

const Close = ({ isOpen, setPanelItem }) => {
  return (
    <button
      className={`fixed md:absolute top-64 md:top-24 right-8 md:right-24 text-white z-10 ${fadeBlipClassName(
        isOpen
      )}`}
      onClick={() => setPanelItem({})}
    >
      <span className="mb-4 w-6 h-1  block  bg-white transform rotate-45 origin-center" />
      <span className="mb-4 w-6 h-1  block  bg-white transform  -translate-y-5 -rotate-45 origin-center" />
    </button>
  );
};

export default Close;
