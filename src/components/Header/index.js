import React from "react";
import { classnames, fadeBlipClassName } from "../../utils";

const Header = ({ shouldOpen }) => {
  const headerClassName = classnames(
    "header  text-center",
    "mb-16",
    fadeBlipClassName(!shouldOpen)
  );
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
        rel="stylesheet"
      />
      <div className={headerClassName}>
        <h1 className="mb-6 mt-12 md:mt-0 text-4xl md:text-6xl font-extrabold font-sans-special">
          🎲 &nbsp;
          <span className="text-blue-100">Roll</span>
          &nbsp;
          <span className="text-red-300">Find</span>
        </h1>
        <p className="text-xl mb-1">
          Quick search of basically anything ⚔️ &nbsp;D&amp;D.
        </p>
        <p className="italic">Well, at least a lot of things...</p>
      </div>
    </>
  );
};

export default Header;
